<template>
  <section class="section">

    <div class="columns">
      <div class="column">
        <card
          title="Billing information"
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
          👩‍💻 Decent technology<br>
          ⛓ Blockchains<br>
          🤝 Smart Contracts<br>
          🔐 Cryptography<br>
          🥽 AR/VR/NFT<br>
          </b>
        </card>
      </div>

      <div class="column">
        <card
          title="Hire Matej for project"
          icon="account"
        >
          <a href="https://hypersignal.xyz/">
            Matej's track record
          </a>
        </card>
      </div>
    </div>

    <div class="columns is-mobile is-center">

      <div class="column is-full">
        <model-viewer
          model="https://meshhouse.art/backend/upload/interactive/BoomBox.glb"
          modeltitle="BoomBox"
          author="Khronos Group"
          authorlink="https://khronos.org"
        >
          <span slot="logo">Model Viewer 1.0.0</span>
        </model-viewer>
      </div>

    </div>
  </section>
</template>

<script>
import Card from '~/components/Card'
import '@meshhouse/model-viewer';

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
