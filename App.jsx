import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function OpenAIQueryApp() {
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer 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`
        },
        body: JSON.stringify({
          model: "text-davinci-003", // or "gpt-3.5-turbo" for GPT-3.5
          prompt: query,
          max_tokens: 100
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error?.message || "Unknown error");
      }
      setOutput(data.choices[0].text.trim());
    } catch (err) {
      console.error(err);
      setOutput("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">OpenAI Query App</h1>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your query"
        className="border rounded p-2"
      />
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Loading..." : "Submit"}
      </Button>
      <Textarea
        value={output}
        readOnly
        rows={8}
        className="border rounded p-2"
      />

      {/* Microsoft Clarity Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "rd3rpzte9x");
          `
        }}
      />
    </div>
  );
}
