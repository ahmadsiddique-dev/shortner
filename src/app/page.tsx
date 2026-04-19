"use client";

import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import handleForm from "./actions/link.action";
import React, { useActionState, useEffect, useState } from "react";
import ResponseDialog from "@/components/elements/ResponseDialog";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import useApi from "@/lib/apiClient";
import axios from "axios";
import { useDebounceValue } from "usehooks-ts";
import { Spinner } from "@/components/ui/spinner";
import validator from "validator";

const page = () => {
  const [state, action, pending] = useActionState(handleForm, null);
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedValue, setValue] = useDebounceValue("", 500);
  const [isEnable, setIsEnable] = useState(false);

  useEffect(() => {
    if (!debouncedValue) return;
    executeUnique(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    if (state && !pending && state.success) {
      setIsOpen(true);
    } else if (state && !pending && !state.success) {
      toast.error(state.message || "Something went wrong!");
    }
  }, [state, pending]);

  const {
    loading: LoadingUnique,
    data: dataUnique,
    execute: executeUnique,
  } = useApi((slug: string | undefined) =>
    axios.post(`/api/check-unique`, { slug }),
  );

  const checkInputSlug = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    const isValid = validator.isURL(
      process.env.NEXT_PUBLIC_HOSTNAME + e.target.value,
      {
        protocols: [process.env.NODE_ENV === "production" ? "https" : "http"],
        require_tld: false,
      },
    );
    if (isValid) {
      setIsEnable(true);
    } else {
      setIsEnable(false);
    }
  };

  return (
    <main>
      <h1 className="text-center my-7 md:my-16 text-6xl text-transparent animate-gradient bg-linear-to-r from-amber-500 via-amber-700 to-black bg-clip-text font-extrabold tracking-tight text-shadow-lg">
        URL Shortner
      </h1>
      <section>
        <div className="max-w-77.5 mx-auto">
          <Card>
            <CardHeader>
              <h2 className="text-center font-bold text-xl">Shorten UR URL</h2>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-4" action={action}>
                <div>
                  <label htmlFor="providedurl">Url to shorten</label>
                  <Input type="text" name="providedurl" />
                </div>

                <div className={"relative"}>
                  <span className="absolute right-0">
                    {debouncedValue.length > 2 && (
                      <span className="absolute right-0">
                        {LoadingUnique ? (
                          <span className="flex gap-1.5 justify-center items-center">
                            <Spinner />
                            <p className="text-muted-foreground">Loading</p>
                          </span>
                        ) : !dataUnique?.data?.success ? (
                          <span className="text-red-500">Occupied</span>
                        ) : (
                          <span className="text-green-500">Available</span>
                        )}
                      </span>
                    )}
                  </span>
                  <label htmlFor="slug">Prefered Slug</label>
                  <Input
                    onChange={(e) => {
                      checkInputSlug(e);
                    }}
                    type="text"
                    name="slug"
                  />
                  <p className="text-red-500">
                    {!isEnable && debouncedValue.length > 2 && "Invalid Slug"}
                  </p>
                </div>

                <Button
                  disabled={
                    LoadingUnique ||
                    pending ||
                    !isEnable ||
                    !dataUnique?.data?.success
                  }
                  type="submit"
                >
                  {pending ? (
                    <>
                      <Loader2 className="animate-spin" /> loading
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <p className="opacity-50">Enjoye!</p>
            </CardFooter>
          </Card>
          <ResponseDialog
            link={state?.url || "https://ahmadsiddique.dev"}
            open={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
      </section>
    </main>
  );
};

export default page;
