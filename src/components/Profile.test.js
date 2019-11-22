import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { Profile } from './Profile';
import { User } from '../data/user';

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

it("renders with loading message", () => {
    act(() => {
        render(<Profile />, container);
    });
    expect(container.textContent).toBe("Loading");
});

it("renders default Team to-do list", () => {
    act(() => {
        render(<Profile user={User} />, container)
    });
    expect(container.textContent).toContain("Team To-Do List");
});