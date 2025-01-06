import React, { useState } from "react";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  person_age: z.number().int().min(0),
  person_income: z.number().int().min(0),
  person_home_ownership: z.string(),
  person_emp_length: z.number().int().min(0),
  loan_grade: z.string(),
  loan_amnt: z.number().min(0),
  loan_int_rate: z.number().min(0),
  loan_percent_income: z.number().min(0),
  cb_person_default_on_file: z.number().int().min(0).max(1),
  cb_person_cred_hist_length: z.number().int().min(0),
  monthly_debt_payments: z.number().min(0),
  savings_account_balance: z.number().min(0),
  debt_to_income_ratio_dti: z.number().min(0),
  utility_bills_payment_history: z.number().int().min(0),
  number_of_dependents: z.number().int().min(0),
  payment_history: z.string(),
  geo_data: z.string(),
  employment_consistency: z.boolean(),
  ecom_data_amazon_pay: z.number().min(0),
  delay: z.number().min(0),
  annual_expense: z.number().min(0),
  industry_company_stability: z.string(),
  education_certifications: z.string(),
});

const ShapValuesChart = ({ originalValues }) => {
  const getFeatureName = (index) => `Feature ${index + 1}`;

  const data = originalValues.map((value, index) => ({
    feature: getFeatureName(index),
    value: value,
    fill: value >= 0 ? "#2196F3" : "#F44336",
  }));

  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-bold mb-4">SHAP Values Distribution</h2>
      <BarChart
        width={600}
        height={400}
        data={data}
        margin={{ top: 20, right: 30, left: 30, bottom: 60 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="feature"
          angle={-45}
          textAnchor="end"
          interval={0}
          height={60}
        />
        <YAxis
          label={{ value: "SHAP Value", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Bar
          dataKey="value"
          fill="#2196F3"
          fillOpacity={0.8}
          stroke="#000000"
          strokeWidth={1}
        />
      </BarChart>

      <div className="mt-6 p-4 bg-gray-50 rounded">
        <h3 className="text-lg font-semibold mb-2">SHAP Values:</h3>
        <div className="grid grid-cols-2 gap-4">
          {originalValues.map((value, index) => (
            <div key={index} className="flex justify-between">
              <span className="font-medium">{getFeatureName(index)}:</span>
              <span style={{ color: value >= 0 ? "#2196F3" : "#F44336" }}>
                {value.toFixed(4)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ModelResultsPage = () => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const form = useForm({
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
      monthly_debt_payments: 0,
      savings_account_balance: 0,
      debt_to_income_ratio_dti: 0,
      utility_bills_payment_history: 0,
      number_of_dependents: 0,
      payment_history: "",
      geo_data: "",
      employment_consistency: false,
      ecom_data_amazon_pay: 0,
      delay: 0,
      annual_expense: 0,
      industry_company_stability: "",
      education_certifications: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/model-prediction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to get prediction");

      const result = await response.json();
      setResult(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Model Prediction</CardTitle>
          <CardDescription>
            Enter information to get model prediction and SHAP values
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Numerical inputs */}
                {[
                  "person_age",
                  "person_income",
                  "person_emp_length",
                  "loan_amnt",
                  "loan_int_rate",
                  "loan_percent_income",
                  "cb_person_default_on_file",
                  "cb_person_cred_hist_length",
                  "monthly_debt_payments",
                  "savings_account_balance",
                  "debt_to_income_ratio_dti",
                  "utility_bills_payment_history",
                  "number_of_dependents",
                  "ecom_data_amazon_pay",
                  "delay",
                  "annual_expense",
                ].map((field) => (
                  <FormField
                    key={field}
                    control={form.control}
                    name={field}
                    render={({ field: { onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>
                          {field
                            .split("_")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...fieldProps}
                            onChange={(e) =>
                              onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                {/* Select inputs */}
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
                            <SelectValue placeholder="Select ownership type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {["RENT", "OWN", "MORTGAGE", "OTHER"].map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
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
                  name="payment_history"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment History</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="geo_data"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Geographic Data</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="industry_company_stability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry/Company Stability</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="education_certifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Education/Certifications</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="employment_consistency"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Employment Consistency</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Processing..." : "Get Prediction"}
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
              <h3 className="text-lg font-semibold mb-2">
                Prediction Results:
              </h3>
              {result.xai && <ShapValuesChart originalValues={result.xai} />}
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ModelResultsPage;
