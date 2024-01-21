<template>
  <div ref="reportContainer">
    <div class="grid grid-cols-1 gap-4 pb-[74px]" ref="debtsContainer">
      <div v-if="!impact" class="m-auto">
        <img :src="robotLoading" alt="Description" class="h-[300px] w-[360px] mr-[-28px]" />

        <div class="animate-pulse text-2xl text-center mr-[-28px]">
          Generating your Report
        </div>
      </div>

      <div v-if="impact">
        <div
          v-for="(section, index) in impactComputed"
          :key="index"
          class="w-full m-auto text-center"
        >
          <div class="text-5xl font-bold">
            {{ section.title }}
          </div>

          <div v-if="section.hasBullets" class="text-2xl text-left my-2">
            <ul>
              <li v-for="(bullet, bIndex) in section.description" :key="`bullet-${bIndex}`">
                {{ bullet.slice(1).trim() }}
              </li>
            </ul>
          </div>
          <div v-else class="text-2xl text-left my-2">
            {{ section.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import html2pdf from 'html2pdf.js';
import robotLoading from '../assets/robot-loading.gif';

export default {
  props: {
    impact: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      robotLoading
    };
  },
  computed: {
    impactComputed() {
      const sections = [];
      const pattern = /\*\*(.*?)\*\*(.*?)(?=\*\*|$)/gs;
      let match;

      while ((match = pattern.exec(this.impact))) {
        const title = match[1].trim();
        let description = match[2].trim();
        let bullets = null;

        if (description.startsWith('-')) {
          bullets = description.split('\n').map(s => s.trim()).filter(s => s.startsWith('-'));
        }

        sections.push({
          title,
          description: bullets ? bullets : description,
          hasBullets: !!bullets
        });
      }

      return sections;
    }
  },
  methods: {
    generatePDF() {
      html2pdf(this.reportContainer, {
        margin: 10,
        filename: 'InflationImpact.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      });
    }
  },
  mounted() {
    this.reportContainer = this.$refs.reportContainer;
  }
};
</script>
