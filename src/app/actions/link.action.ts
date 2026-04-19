"use server";
import dbConnect from "@/connection/db_connection";
import UrlModel from "@/model/url.model";

export interface IhandleForm {
  message: string;
  success: boolean;
  url?: string;
}

const handleForm = async (
  prevState: any,
  formData: FormData,
): Promise<IhandleForm> => {
  await dbConnect();

  try {
    const url = formData.get("providedurl");
    const slug = formData.get("slug");

    if (!url || !slug) {
      return { message: "URL and Slug are required!", success: false };
    }
    const response = await UrlModel.findOne({ shortened: slug });

    if (response) {
      return {
        message: "This url already exists",
        success: false,
      };
    }

    const created = await UrlModel.create({
      to_shortened: url,
      shortened: slug,
    });

    return {
      message: "Shortened!",
      success: true,
      url: process.env.NEXT_PUBLIC_HOSTNAME + created.shortened,
    };
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "Internal server error",
      success: false,
    };
  }
};

export default handleForm;
