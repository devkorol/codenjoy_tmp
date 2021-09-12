package com.codenjoy.dojo.services.controller.chat;

/*-
 * #%L
 * Codenjoy - it's a dojo-like platform from developers to developers.
 * %%
 * Copyright (C) 2018 - 2021 Codenjoy
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

import com.codenjoy.dojo.services.chat.ChatControl;
import com.codenjoy.dojo.services.chat.ChatType;
import com.codenjoy.dojo.services.chat.Filter;
import com.codenjoy.dojo.services.dao.Chat;
import com.codenjoy.dojo.web.rest.pojo.PMessage;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;

import java.util.Arrays;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;
import static org.mockito.Mockito.*;

public class ChatCommandTest {

    private ChatControl control;
    private ChatCommand command;

    @Before
    public void setup() {
        // given
        control = mock(ChatControl.class);
        command = new ChatCommand(control);
    }

    @After
    public void after() {
        verifyNoMoreInteractions(control);
    }

    @Test
    public void testGet() {
        // given
        when(control.get(anyInt(), anyString()))
                .thenReturn(someMessage(1));

        // when
        command.process(new ChatRequest("{'command':'get', " +
                "'data':{'id':1, 'room':'room'}}"));

        // then
        verify(control).get(1, "room");
    }

    private PMessage someMessage(int id) {
        return PMessage.from(new Chat.Message(
                "room" + id, 12 + id, ChatType.ROOM_TOPIC,
                "player" + id, 12345L + id, "message" + id), "playerName" + id);
    }

    @Test
    public void testDelete() {
        // given
        when(control.delete(anyInt(), anyString()))
                .thenReturn(true);

        // when
        command.process(new ChatRequest("{'command':'delete', " +
                "'data':{'id':1, 'room':'room'}}"));

        // then
        verify(control).delete(1, "room");

    }

    @Test
    public void testAllInRoom() {
        // given
        when(control.getAllRoom(any(Filter.class)))
                .thenReturn(Arrays.asList(someMessage(1), someMessage(2)));

        // when
        command.process(new ChatRequest("{'command':'getAllRoom', " +
                "'data':{'room':'otherRoom', 'count':1, " +
                "'afterId':2, 'beforeId':5, 'inclusive':true}}"));

        // then
        ArgumentCaptor<Filter> captor = ArgumentCaptor.forClass(Filter.class);
        verify(control).getAllRoom(captor.capture());
        assertEquals("Filter(room=otherRoom, count=1, afterId=2, " +
                        "beforeId=5, inclusive=true)",
                captor.getValue().toString());
    }

    @Test
    public void testAllInField() {
        // given
        when(control.getAllField(any(Filter.class)))
                .thenReturn(Arrays.asList(someMessage(1), someMessage(2)));

        // when
        command.process(new ChatRequest("{'command':'getAllField', " +
                "'data':{'room':'room', 'count':10, " +
                "'afterId':3, 'beforeId':4, 'inclusive':false}}"));

        // then
        ArgumentCaptor<Filter> captor = ArgumentCaptor.forClass(Filter.class);
        verify(control).getAllField(captor.capture());
        assertEquals("Filter(room=room, count=10, afterId=3, " +
                        "beforeId=4, inclusive=false)",
                captor.getValue().toString());
    }

    @Test
    public void testAllInTopic() {
        // given
        when(control.getAllTopic(anyInt(), any(Filter.class)))
                .thenReturn(Arrays.asList(someMessage(1), someMessage(2)));

        // when
        command.process(new ChatRequest("{'command':'getAllTopic', " +
                "'data':{'id':12, 'room':'room2', 'count':3, " +
                "'afterId':4, 'beforeId':6, 'inclusive':true}}"));

        // then
        ArgumentCaptor<Filter> captor = ArgumentCaptor.forClass(Filter.class);
        verify(control).getAllTopic(eq(12), captor.capture());
        assertEquals("Filter(room=room2, count=3, afterId=4, " +
                        "beforeId=6, inclusive=true)",
                captor.getValue().toString());
    }

    @Test
    public void testPostRoom() {
        // given
        when(control.postRoom(anyString(), anyString()))
                .thenReturn(someMessage(1));

        // when
        command.process(new ChatRequest("{'command':'postRoom', " +
                "'data':{'text':'message4', 'room':'otherRoom'}}"));

        // then
        verify(control).postRoom("message4", "otherRoom");
    }

    @Test
    public void testPostField() {
        // given
        when(control.postField(anyString(), anyString()))
                .thenReturn(someMessage(1));

        // when
        command.process(new ChatRequest("{'command':'postField', " +
                "'data':{'text':'message2', 'room':'room3'}}"));

        // then
        verify(control).postField("message2", "room3");
    }

    @Test
    public void testPostTopic() {
        // given
        when(control.postTopic(anyInt(), anyString(), anyString()))
                .thenReturn(someMessage(1));

        // when
        command.process(new ChatRequest("{'command':'postTopic', " +
                "'data':{'id': 12, 'text':'message1', 'room':'room'}}"));

        // then
        verify(control).postTopic(12, "message1", "room");
    }

    @Test
    public void testPostTopic_messageIsNull() {
        // when
        command.process(new ChatRequest("{'command':'postTopic', " +
                "'data':{'id': 12, 'text':null, 'room':'room'}}"));

        // then
        verify(control).postTopic(anyInt(), eq(null), anyString());
    }

    @Test
    public void testPostTopic_caseException() {
        // given
        when(control.postTopic(anyInt(), eq(null), anyString()))
                .thenThrow(new IllegalArgumentException("Message is null"));

        // when
        try {
            command.process(new ChatRequest("{'command':'postTopic', " +
                    "'data':{'id': 12, 'room':'room'}}"));
            fail("Expected exception");
        } catch (Exception exception) {
            assertEquals("java.lang.IllegalArgumentException: Message is null",
                    exception.toString());
        }
        // then
        verify(control).postTopic(12, null, "room");
    }
}
