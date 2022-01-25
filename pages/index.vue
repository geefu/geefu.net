<template>
  <section class="section">

    <div class="columns">
      <div class="column">
        <card
          title="Billing information - Slovakia"
          icon="home"
        >
            Geefu s.r.o.<br>
            Klincová 35<br>
            821 08 Bratislava<br>
            Slovak Republic, Europe<br>
            Company No.: 46430342<br>
            VAT: SK2023376740<br>
            DIC: 2023376740<br>
        </card>
      </div>

      <div class="column">
        <card
          title="Scope of work"
          icon="cellphone-link"
        >
          <b class="has-text-grey">
          👩‍💻 Distributed<br>
          ⛓ Blockchains<br>
          🤝 Smart Contracts<br>
          🔐 Cryptography<br>
          🥽 AR/VR/webXR<br>
          🖼 NFT<br>
          🏞 Metaverses<br>
          </b>
        </card>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <card
          title="Billing information - Slovenia"
          icon="caravan"
        >
            GenArt, Matej Nemček s.p.<br>
            Proletarska cesta 4<br>
            1000 Ljubljana<br>
            Slovenia, Europe<br>
            Company No.: 8976732000<br>
            VAT: SI83616110<br>
        </card>
      </div>

      <div class="column">
        <card
          title="Hire Matej for project"
          icon="spa"
        >
          🦾 Transhumanist<br>
          🤞 Keeps promise<br>
          🙌 Delivers<br>
          💅 Mind the detail<br>
          🔎 See under detail<br>
          🤝 Value add<br>
          📑 <a href="https://hypersignal.xyz/">
            Matej's track record
          </a>
        </card>
      </div>
    </div>

  </section>
</template>

<script>
import Card from '~/components/Card'

export default {
  name: 'HomePage',

  components: {
    Card
  }
}
</script>
<style scoped>

model-viewer {
  /* width: 600px; */
  height: 600px;
}
</style>
