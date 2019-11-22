import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { shallow } from 'enzyme';

import TodoList from './TodoList';
import { User } from '../data/user';

const fakeList = User.lists[0];

let container = null;

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders", () => {
    act(() => {
        render(<TodoList />, container);
    });
    expect(container.textContent).toBe("Tues 12 December");
});

it("renders list items", () => {
    act(() => {
        render(<TodoList list={fakeList} />, container);
    });

    expect(container.textContent).toContain(fakeList.data[0].label);
});
