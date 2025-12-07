import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fromLocation, toLocation, waypoints, budget, travelDate } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const waypointsText = waypoints?.length > 0 
      ? `User has selected these waypoints to visit: ${waypoints.join(', ')}.` 
      : '';

    const prompt = `You are an eco-friendly travel planner AI for India. Generate a detailed travel plan.

Journey Details:
- From: ${fromLocation}
- To: ${toLocation}
${waypointsText}
- Budget: ${budget}
- Travel Date: ${travelDate}

Provide a JSON response with this EXACT structure:
{
  "famousPlaces": [
    {
      "name": "Place Name",
      "description": "Brief description (2-3 sentences)",
      "ecoScore": 85,
      "distanceFromRoute": 5,
      "bestTimeToVisit": "Morning/Evening",
      "entryFee": "₹50 or Free"
    }
  ],
  "transportOptions": [
    {
      "mode": "Train/Bus/Taxi/Flight",
      "name": "Specific service name",
      "duration": "2h 30m",
      "cost": "₹500",
      "carbonFootprint": "Low/Medium/High",
      "ecoRating": 4,
      "frequency": "Every 2 hours",
      "bookingTip": "Book via IRCTC for best prices"
    }
  ],
  "ecoTips": ["Tip 1", "Tip 2", "Tip 3"],
  "totalDistance": 150,
  "estimatedBudget": "₹2000-3000",
  "suggestedItinerary": [
    {
      "day": 1,
      "activities": ["Activity 1", "Activity 2"],
      "transport": "Local bus",
      "accommodation": "Eco-lodge name"
    }
  ],
  "environmentalAlerts": [
    {
      "type": "pollution/wildlife/weather",
      "location": "Location name",
      "severity": "low/medium/high",
      "message": "Alert description",
      "precautions": ["Precaution 1"]
    }
  ]
}

Transport Rules:
- For distances < 30km: Suggest taxi, auto-rickshaw, RTC local buses, metro
- For distances 30-300km: Suggest state buses, trains, shared cabs
- For distances > 300km: Suggest trains, flights, overnight buses

Always prioritize eco-friendly options with lower carbon footprint. Include at least 5-8 famous places between the route. Provide realistic Indian prices.`;

    console.log("Calling Lovable AI with prompt for:", fromLocation, "to", toLocation);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You are an expert eco-travel planner for India. Always respond with valid JSON only, no markdown." },
          { role: "user", content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add more credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error("AI gateway error: " + errorText);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    console.log("AI response received:", content?.substring(0, 200));

    // Parse the JSON response
    let travelPlan;
    try {
      // Remove markdown code blocks if present
      const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
      travelPlan = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      throw new Error("Failed to parse travel plan");
    }

    return new Response(JSON.stringify({ travelPlan }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Travel planner error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
