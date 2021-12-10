package com.codenjoy.dojo.services.controller.screen;

/*-
 * #%L
 * Codenjoy - it's a dojo-like platform from developers to developers.
 * %%
 * Copyright (C) 2018 Codenjoy
 * %%
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public
 * License along with this program.  If not, see
 * <http://www.gnu.org/licenses/gpl-3.0.html>.
 * #L%
 */


import com.codenjoy.dojo.services.Player;
import com.codenjoy.dojo.services.annotations.PerformanceOptimized;
import com.codenjoy.dojo.services.playerdata.PlayerData;
import com.codenjoy.dojo.transport.ws.PlayerSocket;
import com.codenjoy.dojo.transport.ws.PlayerTransport;
import com.codenjoy.dojo.transport.ws.ResponseHandler;
import com.google.common.collect.Sets;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.jetty.websocket.api.Session;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.*;
import java.util.stream.Collector;
import java.util.stream.Stream;

import static java.util.stream.Collector.Characteristics.CONCURRENT;
import static java.util.stream.Collector.Characteristics.UNORDERED;

@Slf4j
@AllArgsConstructor
public class ScreenResponseHandler implements ResponseHandler {

    private PlayerTransport transport;
    private Player player;

    @Override
    public void onResponse(PlayerSocket socket, String message) {
        GetScreenJSONRequest request = new GetScreenJSONRequest(message);
        if (!request.itsMine()) {
            return;
        }

        transport.setFilterFor(socket,
                data -> filter((Map<Player, PlayerData>) data, request));
    }

    @PerformanceOptimized
    private String filter(Map<Player, PlayerData> data,
                                           GetScreenJSONRequest request)
    {
        Stream<Map.Entry<Player, PlayerData>> stream = data.entrySet().stream()
                .filter(entry -> request.isMyRoom(entry.getKey()))
                .filter(entry -> request.isAllPlayers() || request.isFor(entry.getKey()));
        if (request.isAllPlayers()) {
            stream = stream.filter(distinctByKey(entry -> entry.getValue().getGroup().toString()));
        }
        return stream.collect(toJson());
    }

    private Collector<Map.Entry<Player, PlayerData>, Map<String, String>, String> toJson() {
        return new Collector<>() {
            @Override
            public Supplier<Map<String, String>> supplier() {
                return LinkedHashMap::new;
            }

            @Override
            public BiConsumer<Map<String, String>, Map.Entry<Player, PlayerData>> accumulator() {
                return (all, entry) ->
                        all.put(entry.getKey().getId(),
                                entry.getValue().asJson());
            }

            @Override
            public BinaryOperator<Map<String, String>> combiner() {
                return (one, another) -> {
                    one.putAll(another);
                    return one;
                };
            }

            @Override
            public Function<Map<String, String>, String> finisher() {
                return all -> {
                    StringBuilder builder = new StringBuilder("{");
                    for (Map.Entry<String, String> entry : all.entrySet()) {
                        builder.append('"')
                                .append(entry.getKey())
                                .append("\":")
                                .append(entry.getValue())
                                .append(",");
                    }
                    builder.deleteCharAt(builder.length() - 1)
                            .append('}');

                    return builder.toString();
                };
            }

            @Override
            public Set<Characteristics> characteristics() {
                return Sets.newHashSet(UNORDERED, CONCURRENT);
            }
        };
    }

    public static <T> Predicate<T> distinctByKey(Function<? super T, ?> keyExtractor) {
        Set<Object> seen = ConcurrentHashMap.newKeySet();
        return t -> seen.add(keyExtractor.apply(t));
    }

    @Override
    public void onClose(PlayerSocket socket, int statusCode, String reason) {
        log.debug("Websocket closed: {} from player: {} status code: {} reason: {}", player.getId(), statusCode, reason);
    }

    @Override
    public void onError(PlayerSocket socket, Throwable error) {
        log.error("Request error: player: {}, error: {}", player.getId(), error);
    }

    @Override
    public void onConnect(PlayerSocket socket, Session session) {
        log.debug("Connected: player: {}, session: {}", player.getId(), session);
    }
}
