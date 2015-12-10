(ns webapp.framework.client.webhosting.hostinit
  (:require
   [goog.net.cookies                     :as cookie]
   [om.core                              :as om    :include-macros true]
   [om.dom                               :as dom   :include-macros true]
   [webapp.framework.client.coreclient   :as c     :include-macros true]
   [cljs.core.async                      :refer [put! chan <! pub timeout]]
   [clojure.data                         :as data]
   [clojure.string                       :as string]
   [ankha.core                           :as ankha]
   )
  (:use
   [webapp.framework.client.webhosting.hostmain               :only   [host-app]]
   [webapp.framework.client.system-globals                     :only   [app-state  data-state  set-ab-tests]]
   )
  (:require-macros
   [cljs.core.async.macros :refer [go]])
  (:use-macros
   [webapp-config.settings  :only [setup-fn]])
  )
(c/ns-coils 'webapp.framework.client.webhosting.hostinit)







(defn setup-properties2 []
  {
   :start-component
   host-app

   :setup-fn
   (fn[]
     (do
     (reset!
      app-state

      (assoc-in
       @app-state [:ui]
       { }))

     (reset! data-state {:submit {}})

     (set-ab-tests {})))})