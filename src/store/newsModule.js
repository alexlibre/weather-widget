import axios from "axios";

export const newsModule = {
    state: () => {
      return {
        news: [],
      }
    },
    getters: {
    },
    mutations: {
        setNews(state, news) {
            state.news = news;
        },
    },
    actions: {
        async fetchNews({ state, commit }) {
            try {  
                const response = await axios.get("https://newsapi.org/v2/top-headlines", {
                    params: {
                        country: 'ru',
                        apiKey: 'ac53b26be12b4181a699f1434ac6a742'
                    }
                });
                // const params = {
                //     country: 'ru',
                //     lang: 'ru',
                //     apiKey: 'd29d3406fb2bee574a858aeb6c6a5591'
                // }
                // const response = await fetch(`https://gnews.io/api/v4/top-headlines?lang=${params.lang}&country=${params.country}&apiKey=${params.apiKey}`);

                const news = response.data.articles.filter(item => item.author !== 'ГОРДОН').map(item => {
                    item.title = item.title.split(` - ${item.author}`)[0] + '.'
                    return item;
                })

                commit('setNews', [news]);

                console.log(response.data.articles);

            } catch (error) {
                console.error(error);
            }
      },
    },
    namespaced: true
}
  