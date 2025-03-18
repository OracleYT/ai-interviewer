const mockDatabase = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    password: "password123",
    avatar_url:
      "https://i.ibb.co/Vc3fv0Lw/Screenshot-2025-03-18-at-10-20-58-PM.png",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    password: "mypassword789",
    avatar_url:
      "https://i.ibb.co/6cBD7156/Screenshot-2025-03-18-at-10-22-55-PM.png",
  },
];

export async function authenticateUser({ data }: { data: any }) {
  const user = mockDatabase.find(
    (user) => user?.email === data?.email && user?.password === data?.password
  );

  if (user) {
    return { email: user?.email };
  } else {
    throw new Error("Invalid credentials");
  }
}

export async function user_login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    console.log({ username, password });

    const user = mockDatabase.find((user) => user?.email === username);
    if (!user) throw new Error("User not found");
    if (user.password !== password) throw new Error("Invalid password");
    return Promise.resolve({
      success: true,
      message: "Login successful",
      data: user,
    });
  } catch (e: any) {
    // console.error(e);
    return Promise.resolve({
      success: false,
      message: e.message,
      data: null,
    });
  }
}
