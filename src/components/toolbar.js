/**
 * Created by federicolaggiard on 03/06/15.
 */

module.exports = {

    controller: function(args){

        var data = args;

        var _filter = "";

        function filter(text){
            console.log(text);

            if(text)
                _filter = _filter.concat(text);

            return _filter;
        }

        function isBackButtonVisible(){
            if(data.getCurrentRoute() === data.routes["customersList"])
                return 'hidden';
            return '';
        }

        return{
            filter: filter,
            isBackButtonVisible: isBackButtonVisible
        }
    },

    view: function(ctrl, args){

        return m("div", {},[
            //Back Icon
            m('div',{
                    class: 'icon',
                    id: 'backIcon',
                    style: {
                        visibility: ctrl.isBackButtonVisible
                    }
                    //,onclick: ctrl.backClick.bind(ctrl)
                },
                m('img',{
                    src: 'assets/img/ic_arrow_back_24px.svg'
                })
            ),
            //Search field
            m('input',{
                id: 'txtSearch',
                style: {
                    //display: ctrl.model.displaySearchText()
                },
                oninput: m.withAttr("value",args.setFilter)

            }),
            //Menu icon
            m('div',{
                    class: 'icon',
                    id: 'menuIcon',
                    style: {
                        //display: ctrl.model.displayMenu()
                    }
                    //,onclick: ctrl.menuClick.bind(ctrl)
                },
                m('img',{
                    src: 'assets/img/ic_list_24px.svg'
                })
            )
        ]);
    }

};