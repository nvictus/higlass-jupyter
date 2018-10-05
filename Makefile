.PHONY: all build dist install uninstall clean publish-test publish

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

clean:
	rm -rf higlass_jupyter/static/
	rm -rf build
	rm -rf dist

dist: clean
	python setup.py sdist bdist_wheel

# pip install --index-url https://test.pypi.org/simple/ higlass_jupyter
publish-test: dist
	twine upload --repository-url https://test.pypi.org/legacy/ dist/*

publish: dist
	twine upload dist/*
