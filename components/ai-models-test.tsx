"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  person_age: z.number().int().positive(),
  person_income: z.number().int().positive(),
  person_home_ownership: z.enum(["RENT", "OWN", "MORTGAGE", "OTHER"]),
  person_emp_length: z.number().int().nonnegative(),
  loan_grade: z.enum(["A", "B", "C", "D", "E", "F", "G"]),
  loan_amnt: z.number().positive(),
  loan_int_rate: z.number().positive(),
  loan_percent_income: z.number().positive().max(100),
  cb_person_default_on_file: z.number().int().min(0).max(1),
  cb_person_cred_hist_length: z.number().int().nonnegative(),
});

type FormData = z.infer<typeof formSchema>;

export default function AIModelTest() {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      person_age: 0,
      person_income: 0,
      person_home_ownership: "RENT",
      person_emp_length: 0,
      loan_grade: "A",
      loan_amnt: 0,
      loan_int_rate: 0,
      loan_percent_income: 0,
      cb_person_default_on_file: 0,
      cb_person_cred_hist_length: 0,
    },
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/ai-model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to get a response from the AI model");
      }

      const result = await response.json();
      setResult(JSON.stringify(result, null, 2));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>AI Model Test</CardTitle>
          <CardDescription>
            Enter the required information to test the AI model
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="person_age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="person_income"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Income</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="person_home_ownership"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Home Ownership</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select home ownership" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="RENT">Rent</SelectItem>
                          <SelectItem value="OWN">Own</SelectItem>
                          <SelectItem value="MORTGAGE">Mortgage</SelectItem>
                          <SelectItem value="OTHER">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="person_emp_length"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employment Length (years)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="loan_grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loan Grade</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select loan grade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {["A", "B", "C", "D", "E", "F", "G"].map((grade) => (
                            <SelectItem key={grade} value={grade}>
                              {grade}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="loan_amnt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loan Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="loan_int_rate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loan Interest Rate (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="loan_percent_income"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loan Percent Income</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cb_person_default_on_file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default on File</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select default status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0">No</SelectItem>
                          <SelectItem value="1">Yes</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cb_person_cred_hist_length"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Credit History Length (years)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Processing..." : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          {error && (
            <Alert variant="destructive" className="mb-4 w-full">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {result && (
            <div className="w-full">
              <h3 className="text-lg font-semibold mb-2">AI Model Result:</h3>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code>{result}</code>
              </pre>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
