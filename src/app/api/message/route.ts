import { db } from "@/db";
import { SendMessageValidator } from "@/lib/validators/sendMessageValidator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/types/server";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });
  const userId = user.id;

  const { fileId, message } = SendMessageValidator.parse(body);

  const file = await db.file.findFirst({
    where: {
      id: fileId,
      userId,
    },
  });
  if (!file) return new Response("Not Found", { status: 404 });
  await db.message.create({
    data: {
      text: message,
      isUserMessage: true,
      userId, fileId
    }, 
  });
};
