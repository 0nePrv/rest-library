import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import {AuthorForm} from "../model/author/AuthorForm";
import {BookDisplay} from "../model/book/BookDisplay";
import {BookForm} from "../model/book/BookForm";
import {Loading} from "../ui/Loading";
import {Navbar} from "../ui/Navbar";
import {SelectComponent} from "../ui/SelectComponent";

const ComponentPreviews = () => {
  return (
      <Previews palette={<PaletteTree/>}>
        <ComponentPreview path="/AuthorForm">
          <AuthorForm/>
        </ComponentPreview>
        <ComponentPreview path="/BookDisplay">
          <BookDisplay/>
        </ComponentPreview>
        <ComponentPreview
            path="/BookForm">
          <BookForm/>
        </ComponentPreview>
        <ComponentPreview
            path="/Loading">
          <Loading/>
        </ComponentPreview>
        <ComponentPreview
            path="/Navbar">
          <Navbar/>
        </ComponentPreview>
        <ComponentPreview
            path="/SelectComponent">
          <SelectComponent/>
        </ComponentPreview>
      </Previews>
  )
}

export default ComponentPreviews