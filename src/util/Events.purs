module Events (Events, makeEvents, send, receive) where

import Prelude
import Data.Function.Uncurried (Fn2, Fn3, runFn2, runFn3)
import Control.Monad.Eff (Eff)
import Resource (Resource)


foreign import data Events :: * -> *


foreign import makeEvents :: forall a eff. Eff eff (Events a)


foreign import sendImpl :: forall a b eff. Fn3 (Events a) a b (Eff eff b)

send :: forall a eff. Events a -> a -> Eff eff Unit
send events value = runFn3 sendImpl events value unit


foreign import receiveImpl :: forall a eff. Fn2 (Events a) (a -> Eff eff Unit) (Eff eff Resource)

receive :: forall a eff. Events a -> (a -> Eff eff Unit) -> (Eff eff Resource)
receive events f = runFn2 receiveImpl events f
