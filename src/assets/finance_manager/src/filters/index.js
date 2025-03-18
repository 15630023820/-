import filtersMap from './loanList';
export default {
    install(Vue){
        for(let name in filtersMap){
           Vue.filter(name,filtersMap[name]) 
        }
    }
}