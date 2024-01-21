// app.js
const apiKey = "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";
import OpenAI from "openai";
import express from "express";
import cors from "cors";

const app = express();
const openai = new OpenAI({ apiKey: apiKey });

const port = process.env.PORT || 3000;

app.use(cors());
app.post("/", async (req, res) => {
  const result = await main();
  res.send(result.impact);
});

app.listen(port, () => {
  console.log("API Running on http://localhost:3000");
});

async function main() {
  let messages = [
    {
      role: "system",
      content: `You are a helpful financial advisor. I will give you information about a client. You will use this information to give him a report on the impact of inflation. These are his debts:
    Name of the debt, payoff length, total interest, total payments.
    Credit card 1,	31 months (2 years and 7 months),	$1,606.87,	$7,606.85
    Auto loan,	48 months (4 years),	$2,801.51, $27,801.51
    Home mortgage,	136 months (11 years and 4 months),	$67,127.50,	$317,127.49
    
    These are his total assets: $50000
    Annual salary post taxes: $100000
    
    His spending is 2000$ a month.
    
    The current inflation rate is at 3.4%
    
    Taking into consideration the numbers that we precalculated. Act as a financial advisor giving personalized analysis, show him the impact of inflation on his spending, his assets, assume the interest is constant for his debts and project his future net worth for 1 year, 5 years and 10 years
    
    Talk directly to your client. And give him bullet points, also show the numbers. Place it in a report format. Don’t use real dollars use nominal values for dollars.

    I want you to use this template.

    **Financial Report on the Impact of Inflation**

This financial report provides a personalized analysis and advice on the impact of inflation on your financial situation. Below you'll find an outline of the effects of the current 3.4% inflation rate on your debts, monthly spending, assets, and projections for your future net worth.

**Impact of Inflation on Current Spending:**

- Your current monthly spending is $___.
- With a ___% inflation rate, you would need approximately $___ next year to maintain the same standard of living due to increased costs of goods and services.
- The total annual spending would increase from $___ to $___.

**Inflation Effect on Assets:**

- Your total assets are currently $___.
- Inflation decreases the purchasing power of money. As a result, without any interest or growth, the real value of your $___ would be the equivalent of about $___ next year.

**Debt Obligations:**

- Your debts (credit card, auto loan, and home mortgage) have fixed total payments and interest, which means inflation effectively reduces the "real" cost of these debts over time.
- The payments you make in the future will be in "cheaper dollars" as inflation reduces their value.

**Net Worth Projections:**

Based on a ___% inflation rate, your yearly post-tax salary of $___, monthly spending of $___, and your current debt obligations, here are projections for your net worth:

**1-Year Projection:**
- Salary Post-Taxes: $___
- Spending (Increased for Inflation): $___
- Remaining from Salary: $___
- Debt Payments (Assumed Constant): $___ (Total of all payments for the year)
- Asset Value Decrease due to Inflation: -$___(Approximation)
- Net Worth Increase: $___
- Projected Net Worth: $___

**5-Year Projection:**


**10-Year Projection:**

`,
    },
  ];
  const completion = await openai.chat.completions.create({
    messages,
    model: "gpt-4-1106-preview",
  });
  const impact = completion.choices[0].message.content;
  console.log(impact);

  messages.push({
    role: "user",
    content: 'Based on the "Financial Report on the Impact of Inflation" produces customized strategies and advice to give the client to improve their financial circumstances. List them as numeric bullet points where the first number is what we do first and everything is consecutive. Include numbers from the report to show that the strategies are personalized.',
  });

  const completion2 = await openai.chat.completions.create({
    messages,
    model: "gpt-4-1106-preview",
  });

  const strategies = completion2.choices[0].message.content
  console.log("*********************************************\n\n");
  console.log(strategies);

  const result = {impact, strategies}
  return result;
}
