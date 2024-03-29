<template>
  <div class="grid grid-cols-1 gap-4 pb-[74px]" ref="debtsContainer">
    <div class="max-w-[500px] w-full m-auto">
      <div class="text-5xl font-bold">
        Your Finances
      </div>
      <div class="p-4 my-4 rounded-lg bg-grey-3">
        <div class="text-center text-2xl font-bold mb-4 opacity-60">Annual Revenue</div>
        <q-input dense borderless v-model="salary" class="bg-white px-4 rounded-lg">
          <template v-slot:prepend>
            <span class="text-base">
              $
            </span>
          </template>
        </q-input>
      </div>

      <div class="p-4 my-4 rounded-lg bg-grey-3">
        <div class="text-center text-2xl font-bold mb-4 opacity-60">Value of Assets</div>
        <q-input dense borderless v-model="assets" class="bg-white  px-4 rounded-lg">
          <template v-slot:prepend>
            <span class="text-base">
              $
            </span>
          </template>
        </q-input>
      </div>

      <div class="p-4 my-4 rounded-lg bg-grey-3">
        <div class="text-center text-2xl font-bold mb-4 opacity-60">Monthly Expenses</div>
        <q-input dense borderless v-model="monthlyExpenses" class="bg-white  px-4 rounded-lg">
          <template v-slot:prepend>
            <span class="text-base">
              $
            </span>
          </template>
        </q-input>
      </div>

      <div class="text-5xl font-bold">
        Debts
      </div>
    </div>

    <transition-group name="slide" tag="div" class="w-full">
      <div
        v-for="(debt, debtIndex) in debts"
        :key="debt.id"
        class="max-w-[500px] m-auto w-full bg-grey-3 rounded-lg p-4 transition-all relative"
        :class="debtIndex !== 0 ? 'mt-4' : ''"
      >
        <q-btn
          flat
          round
          v-if="debtIndex !== 0"
          icon="close"
          @click="debts.splice(debtIndex, 1)"
          class="text-red text-sm absolute z-[999] mt-[-4px]"
        />

        <div class="text-center text-2xl font-bold mb-4 opacity-60">Debt #{{ debtIndex + 1}}</div>
        <q-input dense borderless v-model="debt.name" label="Debt Name" class="bg-white px-3 mb-2 rounded-lg" />
        <q-input dense borderless type="number" v-model="debt.remainingBalance" label="Remaining Balance" class="bg-white mb-2 px-3 rounded-lg" />
        <q-input dense borderless type="number" v-model="debt.monthlyPayment" label="Monthly Payment" class="bg-white mb-2 px-3 rounded-lg" />
        <div class="grid grid-cols-2 gap-2">
          <q-input dense borderless type="number" v-model="debt.interestRate" label="Interest Rate (%)" class="bg-white px-3 rounded-lg" />
        </div>

        <q-separator class="max-w-[500px] m-auto w-full my-4"/>

        <div class="text-center">
          <span class="opacity-60">Payoff Length</span>
          <div class="text-2xl font-bold mb-4">{{ handleDebtCalculation(debt).years }} Years</div>
          <span class="opacity-60">Total Interest</span>
          <div class="text-2xl font-bold mb-4">${{ handleDebtCalculation(debt).totalInterest }}</div>
          <span class="opacity-60">Total Payment</span>
          <div class="text-2xl font-bold mb-4">${{ handleDebtCalculation(debt).totalPayments }}</div>
        </div>
      </div>
    </transition-group>

    <q-btn
      unelevated
      icon="add"
      color="primary"
      @click="addDebt()"
      class="w-[500px] rounded-lg m-auto mb-4"
    />
  </div>
</template>

<script setup>
import { ref, watch, nextTick, defineEmits } from 'vue';
import { useCalculateDebt } from 'src/services/calculatorHandling';

const { calculateDebt } = useCalculateDebt();
const emit = defineEmits(['updateCalculator']);

let nextId = 1;

const createNewDebt = () => ({
  id: nextId++,
  name: '',
  remainingBalance: 0,
  monthlyPayment: 0,
  interestRate: 0.00
});

const debts = ref([createNewDebt()])
const debtsContainer = ref(null) // New reference for the container
const salary = ref(0)
const assets = ref(0)
const monthlyExpenses = ref(0)

const calculatorObject = ref({
  salary,
  monthlyExpenses,
  debts,
  assets
})

const handleDebtCalculation = (debt) => {
  const { years, totalInterest, totalPayments } = calculateDebt(
    debt.remainingBalance, 
    debt.monthlyPayment, 
    debt.interestRate
  );

  debt.years = years;
  debt.totalInterest = totalInterest;
  debt.totalPayments = totalPayments;

  return {
    years,
    totalInterest,
    totalPayments
  }
};

const addDebt = () => {
  debts.value.push(createNewDebt());

  nextTick(() => {
    if (debtsContainer.value) {
      debtsContainer.value.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  });
};

watch([salary, monthlyExpenses, debts], () => {
  calculatorObject.value = {
    salary: salary.value,
    spending: monthlyExpenses.value,
    debts: [... debts.value.map(debt => ({ ...debt })) ],
    assets: assets.value
  };

  emit('updateCalculator', calculatorObject.value);
}, { deep: true });
</script>

<style>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s, opacity 0.5s;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}
</style>
