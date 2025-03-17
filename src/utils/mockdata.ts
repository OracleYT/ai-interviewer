const mockDatabase = [
  { email: "user@example.com", password: "password123" },
  { email: "admin@example.com", password: "admin123" },
  { email: "rahul@rahul.com", password: "123" },
  { email: "x@x", password: "x" },
];

export async function authenticateUser({ data }: { data: any }) {
  const user = mockDatabase.find(
    (user) => user.email === data?.email && user.password === data?.password
  );

  if (user) {
    return { email: user.email };
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

    const user = mockDatabase.find((user) => user.email === username);
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
      data: null
    });
  }
}
