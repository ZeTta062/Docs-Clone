"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getUsers() {
    const { sessionClaims } = await auth();
    const clerk = await clerkClient();

    const response = await clerk.users.getUserList({
        organizationId: [(sessionClaims as any)?.o?.id],
    });

    const users = response.data.map((user) => ({
        id: user.id,
        name: user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "익명사용자",
        avatar: user.imageUrl,
    }));

    return users;
}