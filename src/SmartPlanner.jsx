
import { useState } from 'react';
import { Card, CardContent } from './components/ui/card';
import { Slider } from './components/ui/slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const sampleData = [
  { role: 'Operator', headcount: 300, cost: 13500000 },
  { role: 'Maintenance Tech', headcount: 50, cost: 2750000 },
  { role: 'Prod. Supervisor', headcount: 40, cost: 2400000 },
  { role: 'Quality Control', headcount: 25, cost: 1250000 },
  { role: 'Logistics', headcount: 35, cost: 1680000 },
];

export default function SmartPlanner() {
  const [salaryAdj, setSalaryAdj] = useState(0);

  const adjustedData = sampleData.map(item => ({
    ...item,
    adjustedCost: item.cost * (1 + salaryAdj / 100),
  }));

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">SmartPlanner Workforce & Cost Simulator</h1>

      <Tabs defaultValue="dashboard">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="simulator">Scenario Simulator</TabsTrigger>
          <TabsTrigger value="org">Org Pyramid</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid grid-cols-3 gap-4">
            {sampleData.map(role => (
              <Card key={role.role}>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500">{role.role}</p>
                  <p className="text-xl font-semibold">{role.headcount} FTEs</p>
                  <p className="text-sm">Annual Cost: ${(role.cost / 1e6).toFixed(1)}M</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="simulator">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Adjust Salary Increase %</h2>
            <Slider min={0} max={30} step={1} value={[salaryAdj]} onValueChange={([v]) => setSalaryAdj(v)} />
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={adjustedData}>
                <XAxis dataKey="role" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cost" fill="#8884d8" name="Base Cost" />
                <Bar dataKey="adjustedCost" fill="#82ca9d" name="Adjusted Cost" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="org">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Org Pyramid (Ideal vs Actual)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sampleData}>
                <XAxis dataKey="role" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="headcount" fill="#8884d8" name="Actual" />
                <Bar dataKey={() => 50} fill="#ffc658" name="Ideal" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
