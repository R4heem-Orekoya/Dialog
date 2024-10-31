import { currentUser } from "@/data/user";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
   imageUploader: f({ image: { maxFileSize: "4MB" } })
      .middleware(async ({ req }) => {
         const signedInUser = await currentUser()
         
         if (!signedInUser || !signedInUser.id) throw new UploadThingError("Unauthorized");
         
         return { user: signedInUser };
      })
      .onUploadComplete(async ({ metadata, file }) => {
         // console.log("file url", file.url);
         return { file };
      })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
