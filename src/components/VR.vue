<template>
	<div style='position: absolute; height: 20%; width: 20%;'>


        <a-scene  	platform='all' id='vr_scene' renderer="clearColor: #222"
					v-bind:vr-mode-ui='"enabled: " + (vr_type=="move")'
                    keyboard-shortcuts="enterVR: false"
                    v-bind:cursor='(vr_type=="mouse"?"rayOrigin: mouse":false)'>
			<a-assets>

                <a-mixin id="RobotoFont" text="font: /public/aframe_fonts/Roboto-msdf.json"></a-mixin>
                <a-mixin id="SourceCodeProFont" text="font: /public/aframe_fonts/SourceCodePro.fnt"></a-mixin>
                <a-mixin id="AileronFont" text="font: /public/aframe_fonts/Aileron-Semibold.fnt"></a-mixin>


			</a-assets>



			<a-entity v-if='vr_type=="mouse"' id='camera_id'  position="0 0 0"  camera  >
				<a-entity
					material='color: gray;opacity: 0.5;'
					geometry='primitive: plane; width: 10; height: 1; '
					position='0.22 -1.6 -2' >

                    <a-entity position="4.72 4.68 -2"
                          mixin="RobotoFont"
						  v-bind:text='"    ; color: black; align: left; value: User: " + getUserName + "; width: 4; "'
						  rotation='0 0 0'>
                    </a-entity>

                    <a-entity position="4.72 3.9 -2"
                          mixin="RobotoFont"
						  v-bind:text='"; color: black; align: left; value:  "  + get_scanning_status()+";  width: 4;"'
						  rotation='0 0 0'>
                    </a-entity>




					<a-entity   position="-2.5 1.7 -3"
								geometry="primitive: plane; "
								material="color: white; opacity: .9;"
								rotation='0 0 0' >


						<a-entity  	id=visifile_new_logo
									geometry='primitive: plane; height: .7 ; width: 2'
									position='3.1  3.7  0'
									v-bind:material='"src: VisiFileColorHoriz.png;color: white; shader: flat;"'
									></a-entity>






									<a-entity position="6 2.6 1"
		   									geometry="primitive: plane;width: 0; height: 0;"
		                                       mixin="RobotoFont">
		   									<a-animation begin="mouseenter" attribute="rotation"
		   												to="0 0 1" dur="100" direction="alternate"  repeat="3"></a-animation>
		                                           <a-entity  	id=locked
		                                                       geometry='primitive: plane; height: .3 ; width: .256'
		                                                       position='.83 .091 0.1'
		                                                       v-bind:material='"src: " + (locked?"":"un") + "locked.png; alphaTest: 0.5;color: blue;opacity: 1;"'
		                                                       lock_icon=''
		                                                       v-if='getIsLocalMachine'
		                                                       >
		                                                           <a-animation begin="mouseenter" attribute="rotation"
		                                                                       to="0 0 4" dur="100" direction="alternate"  repeat="3"></a-animation>
		                                           </a-entity>
		                                           <a-entity   position=".685 -.18 .4" rotation="0 0 0"
		                                                       mixin="RobotoFont"
		                                                       v-bind:text='"color: black; align: left; value: Data mode: " + (locked?"Locked":"Shared") + " ; width: 3.5; "'>
		                                           </a-entity></a-entity>










                       <a-entity   v-bind:position='((can_see_search_results && !( !in_show_quickview() && is_visible(get_viewed_query_id()) && is_query_selected())) ?6.7:-100) + " 2.5 0"'>




                               <a-entity   position="-1 -1 1"
                                           geometry="primitive: plane; width: 3; height: 1; ;"
                                           v-bind:jump_to_query='(getSearchResults[0]?"queryId: " + getSearchResults[0].id + "; queryFile: " +  get_hash(getSearchResults[0].id) + ( get_file_name(getSearchResults[0].id)?"." + get_file_name(getSearchResults[0].id).split(".").pop():""):false)'
                                           v-bind:highlight_query='(getSearchResults[0]?"queryId: " + getSearchResults[0].id + ";" :false)'
                                           material="color: white; opacity: 1">

                                           <a-entity   position="2 0 0.01"
                                                       mixin="RobotoFont"
                                                       v-bind:text='"color: black;align: left; value: " + (getSearchResults[0]?getSearchResults[0].data:"") + "; width: 5; "'>
                                           </a-entity>

                                           <a-animation begin="mouseenter"
                                                        attribute="position"
                                                        to="-1 -1 .9"
                                                        dur="300"
                                                        direction="alternate"
                                                        repeat="1"></a-animation></a-entity>




                               <a-entity   position="-1 -2 1"
                                           geometry="primitive: plane; width: 3; height: 1; "
                                           v-bind:jump_to_query='(getSearchResults[1]?"queryId: " + getSearchResults[1].id + "; queryFile: " +  get_hash(getSearchResults[1].id) + ( get_file_name(getSearchResults[1].id)?"." + get_file_name(getSearchResults[1].id).split(".").pop():""):false)'
                                           v-bind:highlight_query='(getSearchResults[1]?"queryId: " + getSearchResults[1].id + ";" :false)'
                                           material="color: white; opacity: 1;">
                                           <a-entity   position="2 0 0.01"
                                                       mixin="RobotoFont"
                                                       v-bind:text='"color: black;align: left; value: " + (getSearchResults[1]?getSearchResults[1].data:"") + "; width: 5; "'>
                                           </a-entity>
                                           <a-animation begin="mouseenter" attribute="position"
                                                           to="-1 -2 .9" dur="300" direction="alternate"  repeat="1"></a-animation>
                               </a-entity>




                               <a-entity   position="-1 -3 1"
                                           geometry="primitive: plane; width: 3; height: 1; "
                                           v-bind:jump_to_query='(getSearchResults[2]?"queryId: " + getSearchResults[2].id + "; queryFile: " +  get_hash(getSearchResults[2].id) + ( get_file_name(getSearchResults[2].id)?"." + get_file_name(getSearchResults[2].id).split(".").pop():""):false)'
                                           v-bind:highlight_query='(getSearchResults[2]?"queryId: " + getSearchResults[2].id + ";" :false)'
                                           material="color: white; opacity: 1;">
                                           <a-entity   position="2 0 0.01"
                                                       mixin="RobotoFont"
                                                       v-bind:text='"color: black;align: left; value: " + (getSearchResults[2]?getSearchResults[2].data:"") + "; width: 5; "'>
                                           </a-entity>
                                           <a-animation begin="mouseenter" attribute="position"
                                                           to="-1 -3 .9" dur="300" direction="alternate"  repeat="1"></a-animation>
                               </a-entity>




                               <a-entity   position="-1 -4 1"
                                           geometry="primitive: plane; width: 3; height: 1; "
                                           v-bind:jump_to_query='(getSearchResults[3]?"queryId: " + getSearchResults[3].id + "; queryFile: " +  get_hash(getSearchResults[3].id) + ( get_file_name(getSearchResults[3].id)?"." + get_file_name(getSearchResults[3].id).split(".").pop():""):false)'
                                           v-bind:highlight_query='(getSearchResults[3]?"queryId: " + getSearchResults[3].id + ";" :false)'
                                           material="color: white; opacity: 1;">
                                           <a-entity   position="2 0 0.01"
                                                       mixin="RobotoFont"
                                                       v-bind:text='"color: black;align: left; value: " + (getSearchResults[3]?getSearchResults[3].data:"") + "; width: 5; "'>
                                           </a-entity>
                                           <a-animation begin="mouseenter" attribute="position"
                                                           to="-1 -4 .9" dur="300" direction="alternate"  repeat="1"></a-animation>
                               </a-entity>


                       </a-entity>









                        <a-entity   position="3.3  3.1  0"
                                    mixin="RobotoFont"
                                    v-bind:text='"color: black; align: left; value: Search ; width: 6; "'></a-entity>

                        <a-entity  position="3  3.1  0">

                            <a-entity   geometry="primitive: plane; width: 3; height: .5;"
                                        position="0 0 0.01"
                                        material="color: lightgray; opacity: 1; shader: flat; ">

                                <a-entity   position="1.6 0 0"
                                            mixin="RobotoFont"
                                            v-bind:text='"color: black;align: left; value: " + getCurrentSearch + " ; width: 6; "'>
                                </a-entity>

                                <a-animation begin="mouseenter" attribute="rotation"
                                            to="0 0 1" dur="50" direction="alternate"  repeat="3"></a-animation>
                            </a-entity>


                            <a-entity   position="-.3 -.7 0"
                                        mixin="RobotoFont"
                                        v-bind:text='"color: gray;align: left; value: " + getSearchSubtext + " ; width: 5; "'>
                            </a-entity>

                            <a-entity   v-bind:position='(get_show_related()?.55:-100) + " -0.73 0.5"'
                                        mixin="RobotoFont"
                                        geometry="primitive: plane; width: 1.5; height: .3; ;"
                                        material="color: gray; opacity: 1;"
                                        close_related=''
                                        text="color: white;align: center; value: Cancel filter ; width: 5; ">
                                    <a-animation begin="mouseenter" attribute="rotation"
                                                to="0 0 2" dur="20" direction="alternate"  repeat="3"></a-animation>
                            </a-entity>


                        </a-entity>
                    </a-entity>

                    <a-entity  	material='color: blue;opacity: 1;'
								geometry='primitive: plane; width: 4.5; height: .28; '
                                rotation='0 0 0'
                                id='mouse_click_home'
								position='0.01 .9 1'
                                set_zoom='people: false;'
								goto='name: vr_home; duration: 300;' >
									<a-animation begin="mouseenter" attribute="rotation"
														to="0 0 .5" dur="70" direction="alternate"  repeat="3"></a-animation>
                                <a-entity  position="-.2 0.2 0.3"
                                           rotation="0 0 0"
                                           mixin="RobotoFont"
                                           text='color: white; align: center; value: Go back; width: 2; '>
                                </a-entity>
					</a-entity >


                </a-entity >

            </a-entity>



    		<a-entity v-if='vr_type=="move"' position="0 0 0" material="color: white" >
				<a-entity camera='near: 0.005;' look-controls material="color: white" id='movevr'>
						<a-entity material='color: white;' >
								<a-entity 	position="0 0 -3"
														geometry="primitive: ring; radiusOuter: 0.030; radiusInner: 0.006; color:white;"
														material="color: black; shader: flat"
														cursor="maxDistance: 1000; fuse: true;">
								</a-entity>
						</a-entity>
				</a-entity>
	    	</a-entity>


			<a-entity v-if='vr_type=="move"' position='0 -3.6 -5' >



                <a-entity
					id='move_bar'
					material='color: gray;opacity: .5;'
					geometry='primitive: plane; width: 20; height: 2; '
					position='0 -.8 -1' >

                    <a-entity position="2.5 7.8 1.5"
						  geometry="primitive: plane; width: auto; height: auto" material="color: white"
                          mixin="RobotoFont"
						  v-bind:text='"color: black; align: left; value: User: " + getUserName + "; width: 4; "'
						  rotation='0 0 0'>
                    </a-entity>
                    <a-entity  	material='color: gray;opacity: .95;'
								geometry='primitive: box; width: 10; height: 1; depth: .7'
                                rotation='0 0 0'
								position='0.01 1 1.5'
                                set_zoom='people: false;'
								goto='name: vr_home; duration: 500;' >
									<a-animation begin="mouseenter" attribute="position"
												from="0.01 1 1.5" to="0.01 1 1.4" dur="400" direction="alternate"  repeat="1"></a-animation>
                                 <a-entity position="0 0.3 0.6" rotation="-45 0 0"
                                           mixin="RobotoFont"
                                           text='color: black; align: center; value: Go back ; width: 10; '>
                                </a-entity>
					</a-entity >




                </a-entity>
	    	</a-entity>


			<VR-Home v-bind:vr_type='get_vr_type'></VR-Home>


		   <a-sky color="white"></a-sky>
		</a-scene>
	</div>
</template>





<script>
import output_table         from './output_table.vue'
import VR_items             from './VR_items.vue'
import VR_Home              from './VR_Home.vue'


export default {
    name: 'VR'
	,



	props: ['vr_type']
    ,


    init: function () {
        // Set up the tick throttling.
        this.tick = AFRAME.utils.throttleTick(this.tick, 100, this);
    }
    ,



    /**
    * Tick function that will be wrapped to be throttled.
    */
    tick: function (t, dt) {}
    ,


    computed: {
        getSearchResults: function() {
            return this.$store.state.search_results.local.results;
        }
        ,

		getIsLocalMachine: function() {
	       return this.$store.state.is_local_machine
	     },

		locked: function () {
		 return this.$store.state.locked;
	    },


        getSearchSubtext: function() {
            return this.$store.state.search_subtext;
        }
        ,




        getCurrentSearch: function() {
            return this.$store.state.current_search
        }
        ,




        getUserName: function() {
            return this.$store.state.user_name
        }
        ,







        can_see_search_results: function () {
            return this.$store.state.show_related
            //return true
        }
        ,




        get_vr_type: function () {
            return this.vr_type
        }
        ,




        list_of_drivers: function () {
            return this.$store.getters.list_of_drivers
        }
        ,




        add_driver_visible: function () {
            return this.$store.state.add_driver_visible
        }
        ,




        viewed_driver_id: function () {
            return this.$store.state.viewed_driver_id
        }
        ,




        list_of_fields: function () {
            return this.$store.state.list_of_output_fields
        }
	},



	methods: {
		get_scanning_status: function() {
            return this.$store.state.scanning_status;
        }
        ,


        in_show_quickview: function (id) {
            return  this.$store.state.show_quickview;
        }
        ,

		get_show_related: function() {
            return this.$store.state.show_related;
        },




        get_hash: function (id) {
            if (id == null) {
                return "";
            }
            var qq = window.sqlGetQueryById(id);
            if (qq != null) {
                return qq.hash;
            };
            return "";
        },


        is_visible: function(id) {
            //console.loglog("*********** is_visible: ")
            if (id == null) {
                return false;
            }
            var qm = window.sqlGetQueryUiById(id);
            if (!qm) {
                return false;
            }
            return qm.visible;
        }
        ,



                get_viewed_query_id: function() {
                    //console.loglog("*********** get_viewed_query_id: ")
                    return this.$store.state.viewed_query_id;
                }
                ,




                        is_query_selected: function() {
                            //console.loglog("*********** is_query_selected: ")
                            if ( this.$store.state.viewed_query_id == null) { return false; };
                            return true
                        }
                        ,





        get_file_name: function (id) {
            if (id == null) {
                return "";
            }
            var qq = window.sqlGetQueryById(id);
            if (qq != null) {
                return qq.fileName;
            };
            return "";
        },
	},



    components: {
        'output-table': output_table,
        'VR-Home': VR_Home,
        'VR-items': VR_items
    }


}
</script>





<style>
</style>
