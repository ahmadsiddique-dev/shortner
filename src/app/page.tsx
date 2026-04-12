import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const page = () => {
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
            <CardContent className="flex flex-col gap-4">
              <div>
                <label htmlFor="providedurl">Url to shorten</label>
                <Input type="text" name="providedurl" />
              </div>

              <div>
                <label htmlFor="providedurl">Prefered Url</label>
                <Input type="text" name="providedurl" />
              </div>

              <Button type="submit">Submit</Button>
            </CardContent>
            <CardFooter>
              <p className="opacity-50">Enjoye!</p>
            </CardFooter>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default page;
