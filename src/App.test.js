import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { shallow } from 'enzyme';

import App from './App';

import { User } from './data/user';

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

it("renders both child  with data", () => {
  act(() => {
    render(<App />, container);
  });
  expect(container.textContent).toContain("Guglielmo Marconi");
  expect(container.textContent).toContain("Shortlist features for MVP");
});
