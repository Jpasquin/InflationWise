<template>
  <q-page class="w-full! py-4 bg-white">
    <div class="flex flex-col justify-between m-auto text-center h-[490px]">
      <div class="text-5xl font-bold">
        Empowering Your Financial Future in an Inflating World.
      </div>

      <q-btn
        no-caps
        unelevated
        label="See Our Calculator Here"
        color="primary"
        @click="$router.push('/calculator')"
        class="p-4 rounded-lg w-fit flex m-auto"
      />
    </div>

    <div>
      <div class="text-5xl font-bold py-4">
        What does inflation impact?
      </div>

      <div class="text-xl pb-4">
        Inflation affects virtually every aspect of our finances, subtly altering the value of money over time. 
        Our calculator is designed to help you navigate through these changes by assessing how inflation impacts various financial commitments.
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-[#ffe0d4] rounded-xl p-4">
          <div class="text-2xl font-bold flex m-auto justify-center mb-4 opacity-60">
            Mortgages
          </div>

          <div class="text-center text-base opacity-60">
          A mortgage financial plan provides a detailed overview of your housing-related finances.
          It encompasses your current mortgage details, your homeownership goals, and the strategies in place to achieve those goals. 
          A well-thought-out mortgage plan should include insights into your monthly cash flow, savings allocated for mortgage payments, strategies for paying down debt, and considerations for potential interest rate changes. 
          Additionally, it should factor in insurance coverage relevant to homeownership.
          </div>
        </div>

        <div class="bg-[#d0f7e6] rounded-xl p-4">
          <div class="text-2xl font-bold flex m-auto justify-center mb-4 opacity-60">
            Car Payments
          </div>

          <div class="text-center text-base opacity-60">
          Crafting a financial plan for car payments involves creating a comprehensive picture of your automotive-related finances. 
          This includes details about your current auto loan, your goals regarding vehicle ownership, and the strategies you've established to meet those objectives. 
          An effective car payment plan should delve into your monthly cash flow, the portion allocated for car payments, strategies for managing and potentially paying off car debt, and considerations for potential changes in interest rates. 
          It should also address insurance coverage relevant to your vehicle.
          </div>
        </div>

        <div class="bg-[#e4e3ff] rounded-xl p-4">
          <div class="text-2xl font-bold flex m-auto justify-center mb-4 opacity-60">
            Student Loans
          </div>

          <div class="text-center text-base opacity-60">
          A financial plan for student loans is a detailed roadmap for managing your education-related finances. 
          It outlines your current student loan situation, your educational goals, and the strategies you've put in place to achieve those goals. 
          A robust student loan plan should cover aspects such as your monthly cash flow, funds earmarked for loan repayments, effective strategies for student debt management, and considerations for potential changes in interest rates. 
          It may also involve planning for ongoing educational expenses and insurance coverage.
          </div>
        </div>

        <div class="bg-[#a0c4ff] rounded-xl p-4">
          <div class="text-2xl font-bold flex m-auto justify-center mb-4 opacity-60">
            Other Debts
          </div>

          <div class="text-center text-base opacity-60">
          A financial plan for other debts takes a holistic approach to managing various financial obligations beyond mortgages, car payments, and student loans. 
          This plan offers a comprehensive view of your current debt landscape, your goals for debt reduction, and the strategies you've outlined to accomplish those objectives. 
          A well-rounded plan for other debts should encompass details about your monthly cash flow, funds allocated for debt repayment, effective strategies for minimizing debt, and considerations for potential changes in interest rates. 
          It may also involve planning for insurance coverage relevant to your overall debt portfolio.
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="text-center text-5xl font-bold py-4">
        Frequently Asked Questions
      </div>

      <div class="grid grid-cols-1 gap-4">
        <div class="text-center text-2xl font-bold rounded-xl">
          Lorem ipsum
        </div>

        <q-separator />

        <div class="text-center text-2xl font-bold rounded-xl">
          Lorem ipsum
        </div>

        <q-separator />

        <div class="text-center text-2xl font-bold rounded-xl">
          Lorem ipsum
        </div>

        <q-separator />

        <div class="text-center text-2xl font-bold rounded-xl">
          Lorem ipsum
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
