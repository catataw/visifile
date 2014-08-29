(ns webapp.client.init
  (:require
   [goog.net.cookies                     :as cookie]
   [om.core                              :as om    :include-macros true]
   [om.dom                               :as dom   :include-macros true]
   [webapp.framework.client.coreclient   :as c     :include-macros true]
   [cljs.core.async                      :refer    [put! chan <! pub timeout]]
   [om-sync.core                         :as async]
   [clojure.data                         :as data]
   [clojure.string                       :as string]
   [ankha.core                           :as ankha]
   [webapp.client.timers]
   [webapp.client.data-tree]
   [webapp.client.ui-tree]
   )
  (:use
   [webapp.framework.client.system-globals  :only   [app-state  data-state  set-ab-tests]]
   [webapp.client.react.views.main          :only   [main-view]]
   [clojure.string :only [blank?]]
   )
   (:require-macros
    [cljs.core.async.macros :refer [go]]
    ))
(c/ns-coils 'webapp.client.init)



(def  ^:export setup

  {
   :start-component
   main-view

   :setup-fn
   (fn[]
     (do
     (reset!
      app-state

      (assoc-in
       @app-state [:ui]
       {
        :splash-screen {
                        :show true
                        }

        :request {
                  :from-email           {:label          "Your company email"
                                         :placeholder    "john@microsoft.com"
                                         :value          ""
                                         :mode           "empty"
                                         :private        true
                                         }

                  :to-email             {:label          "Their email"
                                         :placeholder    "pete@ibm.com"
                                         :value          ""
                                         :mode           "empty"
                                         :private        true
                                         }

                  :show-connection-confirmation  false
                  :details-valid                 false

                  :submit               {:value false}
                  }

        :tab         "browser"
        :tab-browser "top companies"
        :login {

                :login-email {
                              :value ""
                              :private true
                              }
                :from-email           {:label          "Your company email"
                                       :placeholder    "john@microsoft.com"
                                       :value          ""
                                       :mode           "empty"
                                       :private        true
                                       }
                }


        }))


     (reset! data-state {
                         :submit {}
                         })



     (if js/company_url
       (do
         (reset! app-state
                 (assoc-in
                  @app-state [:ui :company-details :company-url]
                  (str js/company_url)))

         (reset! app-state
                 (assoc-in
                  @app-state [:ui  :company-details   :skills]
                  nil))

         (reset! app-state
                 (assoc-in
                  @app-state [:ui :tab-browser]
                  "company"))


         (go
          (let [ l (<! (c/remote "get-company-details"
                               {
                                :company-url    (str js/company_url)
                                }))]

            ;(log (pr-str l))
            (reset! data-state
                    (assoc-in
                     @data-state [:company-details]
                     l))


            (reset! app-state
                    (assoc-in
                     @app-state [:ui :company-details :skills]
                     (get-in @data-state [:company-details])))

            ))

         )
       )



     (set-ab-tests {
                    "graph type"
                    {
                     :path [:ui :graph-ab-test]
                     :choices    [
                                  {:name "SVG" :percentage 90}
                                  {:name "text" :percentage 10}
                                  ]
                     }})))})






