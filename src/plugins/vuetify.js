import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({

    theme:{ 
        themes:{
            light:{
                teal: '#00ABB3',
                black: '#3C4048',
                gray: '#B2B2B2',
                space: '#EAEAEA',
                orange: '#EB6440',
                green: '#38E54D',
                mint: '#CFF5E7'
       
            },
        },
    }
});
