<template>
  <div ref="reportContainer">
    <div class="grid grid-cols-1 gap-4 pb-[74px]" ref="debtsContainer">
      <div
        v-for="(section, index) in strategiesComputed"
        :key="index"
        class="w-full m-auto text-center"
      >
        <div class="text-5xl font-bold">
          {{ section.title }}
        </div>

        <ul v-if="section.isList" class="text-2xl text-left my-2">
          <li
            v-for="(item, itemIndex) in section.description"
            :key="`item-${itemIndex}`"
          >
            {{ item }}
          </li>
        </ul>
        <div v-else class="text-2xl text-left my-2">
          {{ section.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import html2pdf from "html2pdf.js";

export default {
  props: {
    strategies: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      reportContainer: null,
    };
  },

  computed: {
    strategiesComputed() {
      const sections = [];
      const pattern = /\*\*(.*?)\*\*(.*?)(?=\*\*|$)/gs;
      let match;

      while ((match = pattern.exec(this.strategies))) {
        const title = match[1].trim();
        let description = match[2].trim();
        let listItems = null;

        if (/^\d+\.\s/.test(description)) {
          listItems = description
            .split(/\n(?=\d+\.\s)/)
            .map((s) => s.trim())
            .filter((s) => s);
        }

        sections.push({
          title,
          description: listItems ? listItems : description,
          isList: !!listItems,
        });
      }
      console.log(sections);
      return sections;
    },
  },

  methods: {
    generatePDF() {
      html2pdf(this.reportContainer, {
        margin: 10,
        filename: "InflationStrategies.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      });
    },
  },
  mounted() {
    this.reportContainer = this.$refs.reportContainer;
  },
};
</script>
