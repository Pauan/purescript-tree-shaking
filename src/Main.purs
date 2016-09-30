module Main where

import Prelude
import Control.Apply (lift3)
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE, log)
import Mutable (MUTABLE, set, makeMutable)
import View (observe, view)

main :: Eff (mutable :: MUTABLE, console :: CONSOLE) Unit
main = do
  m1 <- makeMutable 1
  m2 <- makeMutable 2
  m3 <- makeMutable 3
  void $ observe
    (lift3 (\a b c -> a + b + c) (view m1) (view m2) (view m3))
    (\a -> log $ show a)
  set m1 20
  set m2 30
  set m3 40
