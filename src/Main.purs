module Main where

import Prelude
import Control.Apply (lift3)
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE, log)
import Mutable (MUTABLE, set, makeMutable)
import View (observe, view)

main :: Eff (mutable :: MUTABLE, console :: CONSOLE) Unit
main = do
  a <- makeMutable 1
  b <- makeMutable 2
  c <- makeMutable 3
  void $ observe
    (lift3 (\a b c -> a + b + c) (view a) (view b) (view c))
    (\a -> log $ show a)
  set a 20
  set b 30
  set c 40
