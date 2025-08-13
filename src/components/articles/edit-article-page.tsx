"use client";
import React, {
  FormEvent,
  startTransition,
  useActionState,
  useState,
} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import "react-quill-new/dist/quill.snow.css";
import  { IEditArticle}  from "@/interfaces";
import { editArticle } from "@/actions/edit-article";
import Image from "next/image";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type EditArticleProps = {
    article: IEditArticle;
};

const EditArticlePage: React.FC<EditArticleProps> = ({ article }) => {
  const [content, setContent] = useState(article.content);
  const [formState, action, isPending] = useActionState(
    editArticle.bind(null, article.id),
    {
      errors: {},
    }
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    formData.append("content", content);

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Article</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="text"
                name="title"
                defaultValue={article.title}
                placeholder="Enter a article title"
              />
              {formState.errors.title && (
                <span className="text-red-600 text-sm">
                  {formState.errors.title}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <select
                className="flex h-10 w-full rounded-md"
                name="category"
                id="category"
                defaultValue={article.category}
              >
                <option value="">Select category</option>
                <option value="technology">Technology</option>
                <option value="programming">Programming</option>
                <option value="web-developmentt">Web Development</option>
              </select>
              {formState.errors.category && (
                <span className="text-red-600 text-sm">
                  {formState.errors.category}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured Image</Label>
              <Input
                type="file"
                name="featuredImage"
                id="featuredImage"
                accept="image/*"
              />
              <div className="mb-4 ">
                {article.featuredImage && (
                  <Image
                    src={article.featuredImage}
                    alt="Current featured"
                    width={192}
                    height={128}  
                    className="object-cover rounded-md"
                  />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <ReactQuill theme="snow" value={content} onChange={setContent} />
              {formState.errors.content && (
                <span className="text-red-600 text-sm">
                  {formState.errors.content[0]}
                </span>
              )}
            </div>

            <div className="flex justify-end gap-4 ">
              <Button variant={"outline"}>Cancel</Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Loading...." : "Edit Article"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditArticlePage;
