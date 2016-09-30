module View (class ToView, View, view, observe) where

import Prelude
import Data.Function.Uncurried (Fn2, runFn2)
import Control.Monad.Eff (Eff)
import Resource (Resource)


foreign import data View :: * -> *


class ToView f where
  view :: forall a. f a -> View a


foreign import mapImpl :: forall a b. Fn2 (a -> b) (View a) (View b)

instance functorView :: Functor View where
  map f a = runFn2 mapImpl f a


foreign import applyImpl :: forall a b. Fn2 (View (a -> b)) (View a) (View b)

instance applyView :: Apply View where
  apply f a = runFn2 applyImpl f a


foreign import bindImpl :: forall a b. Fn2 (View a) (a -> View b) (View b)

instance bindView :: Bind View where
  bind a f = runFn2 bindImpl a f


foreign import pureImpl :: forall a. a -> View a

instance applicativeView :: Applicative View where
  pure = pureImpl


foreign import observeImpl :: forall a eff. Fn2 (View a) (a -> Eff eff Unit) (Eff eff Resource)

observe :: forall a eff. View a -> (a -> Eff eff Unit) -> Eff eff Resource
observe view f = runFn2 observeImpl view f
