<template>
  <div v-if="job">
    <h1>{{ job.title }}</h1>
    <!-- <p>The job id is {{ $route.params.id }}</p> -->
    <p>The job id is {{ id }}</p>
    <p>{{ job.details }}</p>
  </div>
  <div v-else>
    <p>Loading job details...</p>
  </div>
</template>

<script>
export default {
  props: ['id'],
  //data() {
  //  return {
  //    id: this.$route.params.id
  //  }
  //}
  data() {
    return {
      BASE_URL: process.env.VUE_APP_BASEURL,
      job: null,
    }
  },
  // fetch the data and pass into jobs
  mounted() {
    fetch(this.BASE_URL + "/jobs/" + this.id).then(res => res.json()).then(data => this.job = data).catch(err => console.log(err.message))
  }
}
</script>

<style>

</style>