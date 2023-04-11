package com.codenjoy.dojo.collapse.model;

/*-
 * #%L
 * Codenjoy - it's a dojo-like platform from developers to developers.
 * %%
 * Copyright (C) 2012 - 2022 Codenjoy
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


import com.codenjoy.dojo.games.collapse.ElementUtils;
import com.codenjoy.dojo.services.field.AbstractLevel;

import java.util.List;

import static com.codenjoy.dojo.games.collapse.Element.BORDER;

public class Level extends AbstractLevel{

    public Level(String map) {
        super(map);
    }

    public List<Cell> cells() {
        return find(Cell::new, ElementUtils.numbers());
    }

    public List<Wall> walls() {
        return find(Wall::new, BORDER);
    }
}