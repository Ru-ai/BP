import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

const ElevateForm = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNo: "",
      companyName: "",
      monthlyRevenue: "",
      industry: ""
    }
  });

  const onSubmit = async (data) => {
    await fetch(import.meta.env.VITE_BASE_URL + '/perspect/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    window.location.href = 'https://www.google.com';
    toast.success("Form submitted successfully!");
    form.reset();
  };

  return (
    <section className="min-h-screen bg-cream relative overflow-hidden flex items-center justify-center px-4">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/subtle-dots.png')] opacity-5" />
      <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-accent/10 blur-[100px] animate-pulse" style={{ animationDuration: '15s' }} />
      <div className="absolute bottom-20 right-0 w-96 h-96 rounded-full bg-accent/15 blur-[120px] animate-pulse" style={{ animationDuration: '20s' }} />

      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 border border-accent/40 rounded-full animate-float" style={{ animationDelay: '0.7s' }}></div>
      <div className="absolute bottom-1/4 right-10 w-28 h-28 border border-accent/40 rounded-full animate-float" style={{ animationDelay: '1.4s' }}></div>
      <div className="absolute top-2/3 left-1/4 w-16 h-16 border border-accent/30 rounded-full animate-float" style={{ animationDelay: '1.1s' }}></div>
      <div className="absolute top-1/3 right-1/5 w-12 h-12 border-2 border-accent/20 rounded-3xl rotate-45 animate-float" style={{ animationDelay: '1.7s' }}></div>

      {/* Form container */}
      <div className="relative z-10 w-full max-w-lg">
        <Card className="w-full shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-bold text-center">Elevate Your Agency</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 000-0000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Agency" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="monthlyRevenue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Revenue</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select monthly revenue" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-15k">$0 - $15k</SelectItem>
                            <SelectItem value="15k-30k">$15k - $30k</SelectItem>
                            <SelectItem value="30k-50k">$30k - $50k</SelectItem>
                            <SelectItem value="50k+">$50k+</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                            <SelectItem value="web-development">Web Development</SelectItem>
                            <SelectItem value="seo">SEO</SelectItem>
                            <SelectItem value="social-media">Social Media</SelectItem>
                            <SelectItem value="advertising">Advertising</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full mt-6 flex justify-center items-center">
                  Submit <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ElevateForm;
