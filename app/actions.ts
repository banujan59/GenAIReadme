"use server";
import { revalidatePath } from "next/cache";
 import { z } from "zod";


 function ValidateDates(startDate : string, endDate : string) 
 {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end > start) 
    return true;
    else 
    return false;
}

export async function createCommitList(
    prevState: {
      message: string;
    },
    formData: FormData,
  ) {
    const schema = z.object({
        startDate: z.string().min(1),
        endDate: z.string().min(1)
    });
    const parse = schema.safeParse({
        startDate: formData.get("startDate"),
        endDate: formData.get("endDate"),
    });
  
    if (!parse.success || !ValidateDates(parse.data.startDate, parse.data.endDate)) 
    {
      return { message: "Make sure the dates ranges are valid !" };
    }
  
    const data = parse.data;



    // Success, return data
    revalidatePath("/");
    return { message: `Added todo from ${data.startDate} to ${data.endDate}` };
  }