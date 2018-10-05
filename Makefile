.PHONY: build install clean all

install:
	python setup.py jsdeps
	jupyter nbextension install --py --symlink --sys-prefix higlass_jupyter
	jupyter nbextension enable --py --sys-prefix higlass_jupyter

uninstall:
	jupyter nbextension uninstall --py --sys-prefix higlass_jupyter
	rm -rf higlass_jupyter/static/
	rm -rf build

build:
	python setup.py jsdeps
	cp conf/* higlass_jupyter/static/

clean:
	rm -rf higlass_jupyter/static/
	rm -rf build
