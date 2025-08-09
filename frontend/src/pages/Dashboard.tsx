import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Users,
  Filter,
  MoreHorizontal,
  Send,
  Eye,
  MousePointer,
  TrendingUp,
  Plus,
} from "lucide-react";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalSubscribers, setTotalSubscribers] = useState(0);
  const [totalSentCampaigns, setTotalSentCampaigns] = useState(0);
  const [sentCampaigns, setSentCampaigns] = useState([]);
  const [emailsPerMonth, setEmailsPerMonth] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("http://localhost:5000/api/v1/user/dashboard", {
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        const data = await res.json();

        setTotalSubscribers(data.totalSubscribers);
        setTotalSentCampaigns(data.totalSentCampaigns);
        setSentCampaigns(data.sentCampaigns);
        setEmailsPerMonth(data.emailsPerMonth);
      } catch (err) {
        setError(err.message || "Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="container mx-auto px-6 py-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-8 text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Here's your email marketing overview.
              </p>
            </div>
            <Link to="/create-campaign">
              <Button variant="hero" className="gap-2">
                <Plus className="w-4 h-4" />
                Create Campaign
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Email Sent</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalSubscribers.toLocaleString()}
              </div>
              <p className="text-xs text-success flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Sent Campaigns
              </CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSentCampaigns}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Campaigns</CardTitle>
                <CardDescription>
                  Your latest email marketing campaigns
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sentCampaigns.length === 0 ? (
                <p className="text-muted-foreground">No campaigns sent yet.</p>
              ) : (
                sentCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">{campaign.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="px-2 py-1 rounded-full text-xs bg-success/10 text-success">
                            Sent
                          </span>
                          <span>
                            {campaign.sent?.toLocaleString() || 0} sent
                          </span>
                          <span>
                            {new Date(campaign.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
