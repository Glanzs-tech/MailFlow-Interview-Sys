import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, ArrowLeft, Send, Eye, Target, CheckCircle } from "lucide-react";

const CreateCampaign = () => {
  const [campaignData, setCampaignData] = useState({
    name: "",
    subject: "",
    previewText: "",
    fromName: "",
    fromEmail: "",
    replyTo: "",
    email: null as File | null,
    content: "",
    prompt: "",
    scheduledDate: "",
    scheduledTime: "",
  });

  const [activeTab, setActiveTab] = useState("setup");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setCampaignData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleInputChange("email", e.target.files[0]);
    }
  };

  const generateContentFromPrompt = () => {
    if (!campaignData.prompt.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setCampaignData((prev) => ({
        ...prev,
        content: 'data',
      }));
      setIsLoading(false);
    }, 1500);
  };
  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
  }
  const accessToken = getCookie("accessToken");

  const handleSendCampaign = async () => {
    if (!campaignData.email) {
      alert("Please upload an Excel file with your audience emails!");
      setActiveTab("setup");
      return;
    }
    if (!campaignData.fromEmail.trim()) {
      alert("Please provide the sender email address.");
      setActiveTab("setup");
      return;
    }
    if (!campaignData.subject.trim()) {
      alert("Please provide the email subject.");
      setActiveTab("setup");
      return;
    }
    if (!campaignData.content.trim()) {
      alert("Please provide the email content.");
      setActiveTab("design");
      return;
    }

    setIsLoading(true);
    console.log(accessToken,"oppopo")
    try {
      const formData = new FormData();
      formData.append("email", campaignData.email);
      formData.append("sender", campaignData.fromEmail);
      formData.append("subject", campaignData.subject);
      formData.append("content", campaignData.content);
      formData.append("campaignName",campaignData.name)

      const response = await axios.post(
        "http://localhost:5000/api/v1/user/send-mail",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
          },
        }
      );

      alert(
        `Campaign sent successfully to ${
          response.data.recipients || "all"
        } recipients!`
      );
    } catch (error: any) {
      console.error("Error sending campaign:", error);
      alert(error.response?.data?.error || "Failed to send campaign.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Create Campaign</h1>
                <p className="text-muted-foreground">
                  Design and send your email campaign
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleSendCampaign}
                disabled={isLoading}
                variant="premium"
                className="gap-2"
              >
                <Send className="h-4 w-4" />
                {isLoading ? "Sending..." : "Send Campaign"}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-4">
              {[
                { id: "setup", label: "Setup", icon: Target },
                { id: "design", label: "Design", icon: Users },
                { id: "preview", label: "Preview", icon: Eye },
              ].map((step, index) => {
                const Icon = step.icon;
                const isActive = activeTab === step.id;
                const isCompleted = false;

                return (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`flex items-center gap-2 px-5 py-2 rounded-lg transition-all cursor-pointer select-none ${
                        isActive
                          ? "bg-primary text-primary-foreground font-semibold"
                          : isCompleted
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                      onClick={() => setActiveTab(step.id)}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                      <span className="text-sm">{step.label}</span>
                    </div>
                    {index < 2 && <div className="w-10 h-px bg-border mx-4" />}
                  </div>
                );
              })}
            </div>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="hidden" />

            <TabsContent value="setup" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-6 w-6" />
                    Campaign Details
                  </CardTitle>
                  <CardDescription>
                    Basic information about your campaign
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="campaignName">Campaign Name</Label>
                    <Input
                      id="campaignName"
                      placeholder="Monthly Newsletter - January 2025"
                      value={campaignData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject Line</Label>
                    <Input
                      id="subject"
                      placeholder="Your monthly dose of awesome updates!"
                      value={campaignData.subject}
                      onChange={(e) =>
                        handleInputChange("subject", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="previewText">Preview Text</Label>
                    <Textarea
                      id="previewText"
                      placeholder="This text appears in the email preview..."
                      value={campaignData.previewText}
                      onChange={(e) =>
                        handleInputChange("previewText", e.target.value)
                      }
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label htmlFor="fromEmail">Sender Email Address</Label>
                    <Input
                      id="fromEmail"
                      type="email"
                      placeholder="newsletter@yourcompany.com"
                      value={campaignData.fromEmail}
                      onChange={(e) =>
                        handleInputChange("fromEmail", e.target.value)
                      }
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-6 w-6" />
                    Upload Audience Excel File
                  </CardTitle>
                  <CardDescription>
                    Upload an Excel file (.xls or .xlsx) containing the email
                    list
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <input
                    type="file"
                    accept=".xls,.xlsx"
                    onChange={handleFileChange}
                    className="border border-dashed border-gray-300 rounded-lg p-6 w-full cursor-pointer text-center text-muted-foreground hover:border-primary transition-colors"
                  />
                  {campaignData.email && (
                    <p className="mt-2 text-success text-sm">
                      Selected file: {campaignData.email.name}
                    </p>
                  )}
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button
                  onClick={() => setActiveTab("design")}
                  variant="premium"
                  disabled={
                    !campaignData.email || !campaignData.fromEmail.trim()
                  }
                >
                  Continue to Design
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="design" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Content Generation Prompt</CardTitle>
                  <CardDescription>
                    Enter a prompt to generate email content using AI
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Enter prompt to generate email content"
                    value={campaignData.prompt}
                    onChange={(e) =>
                      handleInputChange("prompt", e.target.value)
                    }
                    rows={4}
                    className="mb-4"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={generateContentFromPrompt}
                    disabled={isLoading || !campaignData.prompt.trim()}
                  >
                    Generate Content
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Email Content</CardTitle>
                  <CardDescription>
                    Write your email content here or generate with AI above
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Write your email content here..."
                    value={campaignData.content}
                    onChange={(e) =>
                      handleInputChange("content", e.target.value)
                    }
                    rows={15}
                    className="min-h-[400px]"
                  />
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("setup")}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Setup
                </Button>
                <Button
                  onClick={() => setActiveTab("preview")}
                  variant="premium"
                  disabled={!campaignData.content.trim()}
                >
                  Continue to Preview
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Email Preview
                  </CardTitle>
                  <CardDescription>
                    See how your email will look to recipients
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-6 bg-white min-h-[400px]">
                    <div className="border-b pb-4 mb-4">
                      <p className="text-sm text-gray-600">
                        From:{" "}
                        {campaignData.fromName ||
                          campaignData.fromEmail ||
                          "Your Company"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Subject: {campaignData.subject || "Your Subject Line"}
                      </p>
                    </div>
                    <div className="prose max-w-none whitespace-pre-wrap">
                      {campaignData.content ? (
                        campaignData.content
                      ) : (
                        <p className="text-gray-500 italic">
                          Your email content will appear here...
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("design")}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Design
                </Button>
                <Button
                  onClick={handleSendCampaign}
                  variant="premium"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Campaign"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
