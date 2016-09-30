module Mutable (MUTABLE, Mutable, makeMutable, get, set) where

import Prelude
import Data.Function.Uncurried (Fn3, runFn3)
import Control.Monad.Eff (Eff)
import View (class ToView, View)


foreign import data MUTABLE :: !

foreign import data Mutable :: * -> *


foreign import makeMutable :: forall a eff. a -> Eff (mutable :: MUTABLE | eff) (Mutable a)


foreign import get :: forall a eff. Mutable a -> Eff (mutable :: MUTABLE | eff) a


foreign import setImpl :: forall a b eff. Fn3 (Mutable a) a b (Eff (mutable :: MUTABLE | eff) b)

set :: forall a eff. Mutable a -> a -> Eff (mutable :: MUTABLE | eff) Unit
set m a = runFn3 setImpl m a unit


foreign import viewImpl :: forall a. Mutable a -> View a

instance toViewMutable :: ToView Mutable where
  view = viewImpl
