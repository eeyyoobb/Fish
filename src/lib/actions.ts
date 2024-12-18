 "use server";

//import { revalidatePath } from "next/cache";
import {
  TribeSchema,
  ExamSchema,
  ChildSchema,
  CategorySchema,
  CreatorSchema,
} from "./formValidationSchemas";
 import prisma from "./prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { error } from "console";
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from "next";

 type CurrentState = { success: boolean; error: boolean };

export const createCategory = async (
   currentState: CurrentState,
  data: CategorySchema
) => {
  try {
    await prisma.category.create({
      data: {
        name: data.name,
        // creator: {
        //     create: data.creator.map((creatorId) => ({
        //      creator: { connect: { id: creatorId } }, // Connect creator by id
        //      })),
        // },
      },
    });

 //revalidatePath("/list/categorys");
     return { success: true, error: false };
  } catch (err) {
    console.log(err);
     return { success: false, error: true };
   }
 };

export const updateCategory = async (
  currentState: CurrentState,
  data: CategorySchema
) => {
    if (!data.id) {
        throw new Error("Category ID is required for updating.");
      }
  try {
    await prisma.category.update({
      where: {
        id: data.id.toString(),
      },
      data: {
        name: data.name,
        // creators: {
        //     create: data.creators.map((creatorId) => ({
        //      creator: { connect: { id: creatorId } }, // Connect creator by id
        //      })),
        // },
      },
    });

     // revalidatePath("/list/categorys");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteCategory = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.category.delete({
      where: {
        id: id,
      },
    });

    // revalidatePath("/list/categorys");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createTribe = async (
  currentState: CurrentState,
  data: TribeSchema
) => {
  try {
    await prisma.tribe.create({
        //@ts-ignore
      data,
    });

    // revalidatePath("/list/tribe");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateTribe = async (
  currentState: CurrentState,
  data: TribeSchema
) => {
  try {
    await prisma.tribe.update({
      where: {
        id: data.id?.toString(),
      },
      //@ts-ignore
      data,
    });

    // revalidatePath("/list/tribe");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteTribe = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.tribe.delete({
      where: {
        id: id,
      },
    });

    // revalidatePath("/list/tribe");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createCreator = async (
  currentState: CurrentState,
  data: CreatorSchema
) => {
  try {
    const user = await clerkClient.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata:{role:"creator"}
    });
    if (!user || !user.id) {
      throw new Error('Failed to create user in Clerk');
    }

    const newUserId = new ObjectId();
    await prisma.creator.create({
      
      data: {
        id: newUserId.toString(),
        clerkId: user.id ,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone || null,
        address: data.address || null,
        img: data.img || null,
      },
    });
    // revalidatePath("/list/creators");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true, };
  }
};

export const updateCreator = async (
  currentState: CurrentState,
  data: CreatorSchema
) => {
  if (!data.clerkUserId) { // Check if clerkUserId is present
    return { success: false, error: true };
  }

  try {
    // Update user in Clerk using clerkUserId
    console.log("Updating user in Clerk:", data.clerkUserId);
    await clerkClient.users.updateUser(data.clerkUserId, {
      username: data.username,
      ...(data.password !== "" && { password: data.password }),
      firstName: data.name,
      lastName: data.surname,
    });

    // Update creator in database using the MongoDB ID
    console.log("Updating creator in database:", data.id);
    await prisma.creator.update({
      where: {
        id: data.id, // Use the MongoDB ID for the creator record
      },
      data: {
        ...(data.password !== "" && { password: data.password }),
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        // bloodType: data.bloodType,
        // sex: data.sex,
        // birthday: data.birthday,
        // categorys: {
        //   set: data.categorys?.map((categoryId: string) => ({
        //     id: categoryId,
        //   })),
        // },
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log("Error updating creator:", err);
    return { success: false, error: true };
  }
};


export const deleteCreator = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string; // This should be the MongoDB ObjectId
  try {
    // Fetch the creator record from the database using the MongoDB ID
    const creator = await prisma.creator.findUnique({
      where: {
        id: id,
      },
    });

    // Check if creator exists
    if (!creator) {
      return { success: false, error: true, message: "Creator not found." };
    }

    // Use the Clerk user ID to delete the user from Clerk
    await clerkClient.users.deleteUser(creator.clerkId);

    // Delete the creator from the database
    await prisma.creator.delete({
      where: {
        id: id,
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log("Error deleting creator:", err);
    return { success: false, error: true, message: "An error occurred." };
  }
};



export const createChild = async (
  data: ChildSchema
) => {
  console.log(data);
  try {
    // Fetch the father's user details using fatherId from the data
    const fatherUser = await clerkClient.users.getUser(data.fatherId);
    const role = fatherUser?.publicMetadata.role as string;

    // Get the father's role details to access tribe and grade
    //@ts-ignore
    const roleDetails = await prisma[role]?.findFirst({
      where: {
        clerkId: data.fatherId,
      },
      include: {
        tribe: true,
        grade: true,
      },
    });

    if (!roleDetails) {
      return { success: false, error: true, message: "Father's role details not found." };
    }

    // Get tribe and grade from father's role details
    const tribeId = roleDetails.tribe?.id || null;
    const gradeId = roleDetails.grade?.id || null;

    // Create the user in Clerk
    const user = await clerkClient.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: "child" },
    });

    const newUserId = new ObjectId();

    // Create the child record in the database
    await prisma.child.create({
      data: {
        id: newUserId.toString(),
        clerkId: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone || null,
        address: data.address || "",
        img: data.img || null,
        tribeId: tribeId, // Assign the father's tribe ID
        gradeId: gradeId, 
        fatherId: data.fatherId,
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};


// export const updateChild = async (
//   currentState: CurrentState,
//   data: ChildSchema
// ) => {
//   // if (!data.id) {
//   //   return { success: false, error: true };
//   }
//   try {
//     const user = await clerkClient.users.updateUser(data.id, {
//       username: data.username,
//       ...(data.password !== "" && { password: data.password }),
//       firstName: data.name,
//       lastName: data.surname,
//     });

//     await prisma.child.update({
//       where: {
//         id: data.id,
//       },
//       data: {
//         ...(data.password !== "" && { password: data.password }),
//         username: data.username,
//         name: data.name,
//         surname: data.surname,
//         email: data.email,
//         phone: data.phone || null,
//         address: data.address,
//         img: data.img || null,
//         // gradeId: data.gradeId.toString(),
//         // tribeId: data.tribeId.toString(),
//         //parentId: data.parentId,
//       },
//     });
//     // revalidatePath("/list/childs");
//     return { success: true, error: false };
//   } catch (err) {
//     console.log(err);
//     return { success: false, error: true };
//   }
// };

export const deleteChild = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await clerkClient.users.deleteUser(id);

    await prisma.child.delete({
      where: {
        id: id,
      },
    });

    // revalidatePath("/list/childs");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

// export const createExam = async (
//   currentState: CurrentState,
//   data: ExamSchema
// ) => {
//    const { userId, sessionClaims } = auth();
//    const role = (sessionClaims?.metadata as { role?: string })?.role;

//   try {
//     if (role === "creator") {
//       const creatorLesson = await prisma.task.findFirst({
//         where: {
//           creatorId: userId!,
//           id: data.taskId,
//         },
//       });

//       if (!creatorLesson) {
//         return { success: false, error: true };
//       }
//     }

//     await prisma.exam.create({
//       data: {
//         title: data.title,
//         startTime: data.startTime,
//         endTime: data.endTime,
//         taskId: data.taskId.toString(),
//       },
//     });

//     // revalidatePath("/list/categorys");
//     return { success: true, error: false };
//   } catch (err) {
//     console.log(err);
//     return { success: false, error: true };
//   }
// };

export const updateExam = async (
  currentState: CurrentState,
  data: ExamSchema
) => {
    if (!data.id){
        throw error('Exam id is required')
    }
  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  try {
    if (role === "creator") {
      const creatorLesson = await prisma.task.findFirst({
        where: {
          ownerId: userId!,
          // id: data.taskId,
        },
      });

      if (!creatorLesson) {
        return { success: false, error: true };
      }
    }

    await prisma.exam.update({
      where: {
        id: data.id.toString(),
      },
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        // taskId: data.taskId.toString(),
      },
    });

    // revalidatePath("/list/categorys");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteExam = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;

   const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  try {
    await prisma.exam.delete({
      where: {
        id: id,
         ...(role === "creator" ? { task: { creatorId: userId! } } : {}),
      },
    });

    // revalidatePath("/list/categorys");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};


// In lib/actions.ts (or actions.js)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { parentId } = req.query; // Extract parentId from the request URL

  try {
    // Fetch parent data from the database using Prisma
    const parent = await prisma.child.findUnique({
      where: { id: String(parentId) },
      select: {
        tribeId: true,
        gradeId: true,
      },
    });

    if (!parent) {
      return res.status(404).json({ error: "Parent not found" });
    }

    // Return the tribeId and gradeId
    return res.status(200).json(parent);
  } catch (error) {
    console.error("Error fetching parent data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

