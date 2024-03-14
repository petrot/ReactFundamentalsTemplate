export const TEST_NAME = "Test Name";

export const mockedState = {
  user: {
    isAuth: true,
    name: TEST_NAME,
    role: "admin",
    token: "mock-token",
  },
  courses: [
    {
      title: "Course 1",
      description: "Description 1",
      duration: 5,
      authors: [
        "9b87e8b8-6ba5-40fc-a439-c4e30a373d36",
        "1c972c52-3198-4098-b6f7-799b45903199",
        "072fe3fc-e751-4745-9af5-aa9eed0ea9ed",
      ],
      creationDate: "11/03/2024",
      id: "b28fd9ad-c683-4900-bf99-38a1c5748309",
    },
  ],
  authors: [
    {
      name: "author",
      id: "9b87e8b8-6ba5-40fc-a439-c4e30a373d36",
    },
    {
      name: "author2",
      id: "1c972c52-3198-4098-b6f7-799b45903199",
    },
    {
      name: "author3",
      id: "072fe3fc-e751-4745-9af5-aa9eed0ea9ed",
    },
  ],
};

export const mockedStore = {
  getState: () => mockedState,
  subscribe: jest.fn(),
  dispatch: jest.fn(),
};
