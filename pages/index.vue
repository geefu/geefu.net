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

      <div class="column">
        <card
          title="Hire Matej for project"
          icon="account"
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

    <div class="columns is-mobile is-center">
      <div class="column ">
        <iframe
          src="https://nft.kodadot.xyz/rmrk/detail/6572370-0E76E3AC15B4C1FA1E-MACROCOSM-SOUND_OF_NATURE-0000000000000001"
          title="Check this cool NFT on %23KusamaNetwork %23kodadot"
          style="width:480px;height:840px;border:none;"
        ></iframe>
      </div>

      <div class="column">
        <iframe
          src="https://nft.kodadot.xyz/rmrk/detail/6825929-0E76E3AC15B4C1FA1E-GLITCH-LIDAR_MALFUNCTION-0000000000000002"
          title="Check this cool NFT on #KusamaNetwork #KodaDot"
          style="width:480px;height:840px;border:none;"
        ></iframe>
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
