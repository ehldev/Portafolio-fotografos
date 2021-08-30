<template>
  <div class="home">
    <main>
      <section class="banner">
        <!-- Carousel -->
        <div class="carousel">
          
        </div>

        <!-- Banner info -->
        <div class="d-flex justify-content-center align-items-center">
          
          <!-- Header -->
          <HeaderApp />

          <section class="container banner__container">
            <div class="row">
              <div class="col-md-6 d-flex flex-column justify-content-center align-items-center">
                <div class="p-2">
                    <h1 class="banner__titulo">Hola, soy Erick</h1>

                    <p>
                      Una de las cosas que más amo es capturar y retratar momentos únicos a través del arte de la fotografía.
                    </p>

                    <div>
                      <!-- Animación -->
                      <div>
                        
                      </div>

                      <!-- Redes sociales -->
                      <div class="d-flex justify-content-end align-items-center">
                        <span class="d-inline-block mx-1">
                          <i class="fab fa-instagram-square"></i>
                        </span>

                        <span class="d-inline-block mx-1">
                          <i class="fab fa-facebook-square"></i>
                        </span>

                        <span class="d-inline-block mx-1">
                          <i class="fab fa-twitter-square"></i>
                        </span>
                      </div>
                    </div>
                  </div>
              </div>

              <div class="col-md-6">
                <img src="/imagenes/banner.jpg" alt="Fotografo" class="img-fluid">
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import HeaderApp from '@/components/HeaderApp'

export default {
  name: 'Home',
  components: {
    HeaderApp
  }
}
</script>

<style lang="scss">
.banner {
  height: 100vh;

  display: grid;

  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }

  &__container {
    align-self: center !important;
  }

  &__titulo {
    font-size: 2em;

    @media (min-width: 768px) {
      font-size: 1.3em;
    }

    @media (min-width: 992px) {
      font-size: 2em;
    }
  }
}

.carousel {
  background-image: url('/imagenes/slide-1.jpg');
  background-size: cover;
}
</style>
