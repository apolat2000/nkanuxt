import VuexPersistence from 'vuex-persist'

function getPlugins () {
  const plugins = []

  if (process.browser) {
    const vuexLocal = new VuexPersistence({
      storage: window.localStorage
    })

    plugins.push(vuexLocal.plugin)
  }
}

export const plugins = getPlugins()
