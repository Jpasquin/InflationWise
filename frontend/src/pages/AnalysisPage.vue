<template>
  <q-page class="analysis-page flex flex-center w-full h-full min-w-[516px]">
    <transition name="slide-down">
      <div v-if="showIntro && !showStepper" class="text-center max-w-[1200px]">
        <div class="text-5xl font-bold mb-8">
          Get your analysis, build a better future.
        </div>

        <q-btn
          no-caps
          unelevated
          label="Continue"
          color="primary"
          @click="showStepper = true"
          class="p-4 rounded-lg w-fit flex m-auto"
        />
      </div>
    </transition>

    <transition name="slide-down">
      <q-stepper
        v-if="showStepper"
        flat
        v-model="step"
        ref="stepper"
        color="primary"
        animated
        alternative-labels
        class="absolute w-full top-0 my-4 max-w-[1200px]!"
      >
        <q-step
          :name="1"
          title="Debts & Assets"
          icon="calculate"
          :done="step > 1"
        >
          <the-calculator @updateCalculator="calculatorObject = $event" />
        </q-step>

        <q-step
          :name="2"
          title="Inflation Impact"
          icon="info"
          :done="step > 2"
        >
          <the-inflation-impact />
        </q-step>

        <q-step
          :name="3"
          title="Strategies"
          icon="strategy"
        >
          <the-strategies />
        </q-step>
      </q-stepper>
    </transition>

    <q-footer v-if="showStepper" bordered class="bg-grey-3 text-primary text-right p-4">
      <div class="max-w-[1200px]">
        <q-btn
          no-caps
          flat
          v-if="step > 1"
          color="primary"
          label="Back"
          @click="$refs.stepper.previous()"
          class="px-4 py-2 rounded-lg w-fit mr-2"
        />
        <q-btn
          no-caps
          unelevated
          @click="onContinue()"
          color="primary" :label="step === 3 ? 'Finish' : 'Continue'"
          class="px-4 py-2 rounded-lg w-fit"
        />
      </div>
    </q-footer>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAppStore } from 'src/stores/app';
import TheCalculator from 'components/TheCalculator.vue'
import TheInflationImpact from 'components/TheInflationImpact.vue'
import TheStrategies from 'components/TheStrategies.vue'

const appStore = useAppStore();
const step = ref(1)
const showStepper = ref(false)
const showIntro = ref(false)
const calculatorObject = ref({});

const onContinue = async () => {
  const responseOne = await appStore.testApi();
  console.log(responseOne)
  const responseTwo = await appStore.onCreateAnalysis(calculatorObject.value);
  console.log(responseTwo)
}

onMounted(() => {
  showIntro.value = true;
});
</script>


<style>
.slide-down-enter-active, .slide-down-leave-active {
  transition: all 0.5s ease;
}
.slide-down-enter-from, .slide-down-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
.analysis-page .q-stepper__title {
    font-size: 20px;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: -1px;
}
</style>

