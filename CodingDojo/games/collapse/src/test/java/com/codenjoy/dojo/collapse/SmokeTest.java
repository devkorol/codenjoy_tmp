package com.codenjoy.dojo.collapse;

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


import com.codenjoy.dojo.collapse.client.Board;
import com.codenjoy.dojo.collapse.client.ai.AISolver;
import com.codenjoy.dojo.client.local.LocalGameRunner;
import com.codenjoy.dojo.collapse.services.GameRunner;
import com.codenjoy.dojo.collapse.services.GameSettings;
import com.codenjoy.dojo.services.Dice;
import com.codenjoy.dojo.services.multiplayer.GameField;
import com.codenjoy.dojo.utils.Smoke;
import org.junit.Test;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

import static com.codenjoy.dojo.collapse.services.GameSettings.Keys.FIELD_SIZE;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;

public class SmokeTest {

    @Test
    public void test() {
        Dice dice = LocalGameRunner.getDice("435874345435874365843564398", 100, 200);

        // about 2s
        Smoke.play(1000, "SmokeTest.data",
                new GameRunner() {
                    @Override
                    public Dice getDice() {
                        return dice;
                    }

                    @Override
                    public GameSettings getSettings() {
                        return new GameSettings()
                                .integer(FIELD_SIZE, 20);
                    }
                },
                Arrays.asList(new AISolver(dice)),
                Arrays.asList(new Board()),
                (o1, o2) -> assertEquals(o1, o2));
    }
}
