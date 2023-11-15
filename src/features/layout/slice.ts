import {
    Mode as Theme,
    Density,
    applyMode as applyTheme,
    applyDensity,
} from '@cloudscape-design/global-styles';
import { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { load } from '@/common/utils';

export type LayoutState = {
    theme: Theme;
    density: Density;
    activeHref: string;
    breadcrumbs: BreadcrumbGroupProps.Item[];
    navigationOpen: boolean;
    navigationHidden: boolean;
    toolsOpen: boolean;
    toolsHidden: boolean;
};

export const changeTheme = createAsyncThunk(
    'layout/changeTheme',
    async (theme: Theme, { dispatch }) => {
        applyTheme(theme);
        dispatch(setTheme(theme));
    },
);

export const changeDensity = createAsyncThunk(
    'layout/changeDensity',
    async (density: Density, { dispatch }) => {
        applyDensity(density);
        dispatch(setDensity(density));
    },
);

const getInitialState = (): LayoutState => ({
    theme: load<Theme>('theme') || Theme.Light,
    density: load<Density>('density') || Density.Comfortable,
    activeHref: '/',
    breadcrumbs: [],
    navigationOpen: false,
    navigationHidden: false,
    toolsOpen: false,
    toolsHidden: false,
});

const layoutSlice = createSlice({
    name: 'layout',
    initialState: getInitialState(),
    reducers: {
        setTheme: (state, action: PayloadAction<Theme>) => {
            state.theme = action.payload;
        },
        setDensity: (state, action: PayloadAction<Density>) => {
            state.density = action.payload;
        },
        setActiveHref: (state, action: PayloadAction<string>) => {
            state.activeHref = action.payload;
        },
        setBreadcrumbs: (state, action: PayloadAction<BreadcrumbGroupProps.Item[]>) => {
            state.breadcrumbs = action.payload;
        },
        setNavigationOpen: (state, action: PayloadAction<boolean>) => {
            state.navigationOpen = action.payload;
        },
        setNavigationHidden: (state, action: PayloadAction<boolean>) => {
            state.navigationHidden = action.payload;
        },
        setToolsOpen: (state, action: PayloadAction<boolean>) => {
            state.toolsOpen = action.payload;
        },
        setToolsHidden: (state, action: PayloadAction<boolean>) => {
            state.toolsHidden = action.payload;
        },
    },
});

export const {
    setTheme,
    setDensity,
    setActiveHref,
    setBreadcrumbs,
    setNavigationOpen,
    setNavigationHidden,
    setToolsOpen,
    setToolsHidden,
} = layoutSlice.actions;

export const layoutReducer = layoutSlice.reducer;
